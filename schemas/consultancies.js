const { ConsultanciesController } = require('../controllers');
const { validateAuthAdmin } = require('../libs/auth');

const typeDef = `
type Consultancie {
  id: ID
  title: String
  collaborators : [Collaborator]
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
}

input ConsultancieInput {
  title: String
}
`;

const resolvers = {
  Query: {
    consultancies: (_, args, context) => {
      return ConsultanciesController.getConsultancies();
    },
    consultancieById: (_, { id }, context) => {
      return ConsultanciesController.getConsultancieById(id);
    },
  },
  Mutation: {
    createConsultancie: (_, { input }, context) => {
      validateAuthAdmin(context);
      return ConsultanciesController.createConsultancie(input);
    },
    deleteConsultancie: (_, { id }, context) => {
      validateAuthAdmin(context);
      return ConsultanciesController.deleteConsultancie(id);
    },
    updateConsultancie: (_, { id, input }, context) => {
      validateAuthAdmin(context);
      return ConsultanciesController.updateConsultancie(id, input);
    },
  },
};

module.exports = {
  typeDef,
  resolvers,
};
