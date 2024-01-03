const { AddressController } = require('../controllers');
const { validateAuth } = require('../libs/auth');

const typeDef = `
type Address {
    id: ID
    street: String
    number: String
    interior: String
    colony: String
    city: String
    state: String
    references: String
    zipCode: String
    createdAt: String
    updatedAt: String
    deletedAt: String    
}

input AddressInput {
    street: String
    number: String
    interior: String
    colony: String
    city: String
    state: String
    references: String
    zipCode: String

    }
    `;
const resolvers = {
  Query: {
    getUserAddresses: (_, args, context) => {
      validateAuth(context);
      const { user } = context;
      console.log(user.id, 'user.id______________________');

      return AddressController.getUserAddresses(user.id);
    },
  },
  Mutation: {
    createAddress: (_, { input }, context) => {
      validateAuth(context);
      const { user } = context;
      return AddressController.createAddress(input, user.id);
    },
    updateAddress: (_, { id, input }, context) => {
      validateAuth(context);
      return AddressController.updateAddress(id, input);
    },
    deleteAddress: (_, { id }, context) => {
      return AddressController.deleteAddress(id);
    },
  },
};

module.exports = {
  typeDef,
  resolvers,
};
