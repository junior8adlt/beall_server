const { CollaboratorController } = require('../controllers');
const { validateAuthAdmin } = require('../libs/auth');

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
  profileImageUrl: String
  consultancies: [String]
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
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
    createCollaborator: (_, { input }, context) => {
      validateAuthAdmin(context);
      return CollaboratorController.createCollaborator(input);
    },
    deleteCollaborator: (_, { id }, context) => {
      validateAuthAdmin(context);
      return CollaboratorController.deleteCollaborator(id);
    },
    updateCollaborator: (_, { id, input }, context) => {
      validateAuthAdmin(context);
      return CollaboratorController.updateCollaborator(id, input);
    },
  },
};

module.exports = {
  typeDef,
  resolvers,
};
