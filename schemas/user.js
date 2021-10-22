const { UserController, RecoveryCodeController } = require("../controllers");
const { validateAuth } = require("../libs/auth");
const { generateRandomCode } = require("../libs/utils");
const { sendEmailCode } = require("../libs/email");
const { emailError } = require("../libs/errors");

const sharedProperties = `
  name: String
  lastName: String
  cellphone: String
  gender: Gender
  age: Int
`;

const typeDef = `
  input UserInput {
    ${sharedProperties}
    email: String!
    password: String!
  }
  input UserUpdateInput {
    ${sharedProperties}
  }
  enum Role {
    ADMIN
    USER
  }
  enum Gender {
    MALE
    FAMALE
  }
  type Auth {
    token: String
    role: Role
    mercadoPagoId: String
  }
  type User {
    id: ID
    name: String
    lastName: String
    email: String
    password: String
    timesLoggedIn: Int
    cellphone: String
    gender: Gender
    age: Int
    mercadoPagoId: String
    role: Role
    createdAt: Date
    updatedAt: Date
    deletedAt: Date
  }
`;

const resolvers = {
  Query: {
    user: (_, { id }, context) => {
      validateAuth(context);
      return UserController.getUser(id);
    },
    login: (_, { email, password }, context) => {
      return UserController.login(email, password);
    },
  },
  Mutation: {
    updateUserPassword: (_, { code, password }, context) => {
      return UserController.updateUserPassword(code, password);
    },
    updateUser: (_, { id, input }, context) => {
      validateAuth(context);
      return UserController.updateUser(id, input);
    },
    createUser: async (_, { input }, context) => {
      const newUser = await UserController.createUser(input);
      const code = generateRandomCode();
      const recoveryCodeData = {
        code,
        userId: newUser.id,
      };
      await RecoveryCodeController.create(recoveryCodeData);
      const isEmailSent = await sendEmailCode(code, newUser.email);
      if (!isEmailSent) {
        throw emailError();
      }
      return newUser;
    },
    activateUser: async (_, { code }, context) => {
      return UserController.activateUser(code);
    },
  },
};

module.exports = {
  typeDef,
  resolvers,
};
