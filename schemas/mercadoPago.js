const { UserController, RecoveryCodeController } = require("../controllers");
const { validateAuth } = require("../libs/auth");
const { generateRandomCode } = require("../libs/utils");
const {
  sendEmailCode,
  sendEmailRecoverPasswordCode,
} = require("../libs/email");
const { emailError } = require("../libs/errors");

const typeDef = `
  enum CurrencyMercadoPago {
    MXN
    USD
  }
  enum CategoryMercadoPago {
    others
    learnings
    services
  }
  input PreferenceItemsInput {
    title: String!
    currency_id: CurrencyMercadoPago!
    picture_url: String!
    description: String!
    category_id: CategoryMercadoPago!
    quantity: Int!
    unit_price: Int!
  }
  input PayerInput {
    name: String
    surname: String
    email: String
  }
`;

const resolvers = {
  Query: {},
  Mutation: {
    createPreference: async (_, { referenceItemsInput, payerInput }, context) => {
      try {
        
        return true;
      } catch (error) {
        return error;
      }
    },
  },
};

module.exports = {
  typeDef,
  resolvers,
};
