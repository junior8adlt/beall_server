const { CollaboratorController } = require('../controllers');
const { validateAuthAdmin } = require('../libs/auth');
const { notFound } = require('../libs/errors');
const sequelize = require('../models/index').sequelize;
const typeDef = `
enum Gender {
    MALE
    FEMALE
  }

type Collaborator {
  id: ID
  slug: String
  name: String
  lastName: String
  degree: String
  presentationDesc: String
  cellphone: String
  gender: Gender
  age: Int
  consultancies: [Consultancie]
  profileImageUrl: String
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
}
input UpdateConsultancie {
  addedConsultancies: [Int]
  removedConsultancies: [Int]
}

input CollaboratorInput {
  name: String
  lastName: String
  degree: String
  presentationDesc: String
  cellphone: String
  gender: Gender
  age: Int
  profileImageUrl: String
  consultancies: [UpdateConsultancie]
}
`;

const resolvers = {
  Query: {
    collaborators: (_, args, context) => {
      return CollaboratorController.getCollaborators();
    },
    collaboratorById: (_, { id }, context) => {
      return CollaboratorController.getCollaboratorById(id);
    },
    collaboratorBySlug: (_, { slug }, context) => {
      return CollaboratorController.getCollaboratorBySlug(slug);
    },
  },
  Mutation: {
    createCollaborator: async (_, { input }, context) => {
      validateAuthAdmin(context);
      const { consultancies: collaboratorConsultancies, ...rest } = input;
      const t = await sequelize.transaction();
      try {
        const collaborator = await CollaboratorController.createCollaborator(rest, t);
        if (collaboratorConsultancies.length > 0) {
          const addedConsultancies = collaboratorConsultancies[0]['addedConsultancies'];
          const consultancies = addedConsultancies.map((consultancy) => {
            return {
              collaboratorId: collaborator.dataValues.id,
              consultancieId: consultancy,
            };
          });
          await CollaboratorController.assignManyConsultanciesToCollaborator(consultancies, t);
        }
        await t.commit();
        return collaborator;
      } catch (error) {
        await t.rollback();
        return error;
      }
    },
    deleteCollaborator: async (_, { id }, context) => {
      validateAuthAdmin(context);
      const collaborator = await CollaboratorController.getCollaboratorById(id);
      if (!collaborator) {
        throw notFound();
      }
      const { consultancies } = collaborator;

      if (consultancies.length > 0) {
        const removedConsultanciesIds = consultancies.map((consultancy) => {
          return consultancy.id;
        });
        await CollaboratorController.deleteManyConsultanciesFromCollaborator(
          removedConsultanciesIds,
          id,
        );
      }
      return CollaboratorController.deleteCollaborator(id);
    },
    updateCollaborator: async (_, { id, input }, context) => {
      validateAuthAdmin(context);
      const { consultancies, ...rest } = input;
      if (consultancies.length > 0) {
        const addedConsultancies = consultancies[0]['addedConsultancies'];
        const removedConsultancies = consultancies[0]['removedConsultancies'];
        if (addedConsultancies.length > 0) {
          const addedConsultanciesToCollaborator = addedConsultancies.map((consultancyId) => {
            return {
              collaboratorId: id,
              consultancieId: consultancyId,
            };
          });
          await CollaboratorController.assignManyConsultanciesToCollaborator(
            addedConsultanciesToCollaborator,
          );
        }
        if (removedConsultancies.length > 0) {
          await CollaboratorController.deleteManyConsultanciesFromCollaborator(
            removedConsultancies,
            id,
          );
        }
      }

      return CollaboratorController.updateCollaborator(id, rest);
    },
  },
};

module.exports = {
  typeDef,
  resolvers,
};
