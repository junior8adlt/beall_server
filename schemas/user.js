const { UserController, RecoveryCodeController } = require('../controllers');
const { validateAuth } = require('../libs/auth');
const { generateRandomCode } = require('../libs/utils');
const {
  sendEmailCode,
  sendEmailRecoverPasswordCode,
} = require('../libs/email');
const { emailError } = require('../libs/errors');

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
    imageUrl: String
  }
  enum Role {
    ADMIN
    USER
  }
  enum Gender {
    MALE
    FEMALE
  }
  type Auth {
    token: String
    role: Role
    mercadoPagoId: String
    user: User
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
    imageUrl: String
    mercadoPagoId: String
    role: Role
    createdAt: Date
    updatedAt: Date
    deletedAt: Date
  }
`;

const resolvers = {
  Query: {
    user: (_, args, context) => {
      validateAuth(context);
      const { user } = context;
      return user;
    },
    login: (_, { email, password }, context) => {
      return UserController.login(email, password);
    },
    sendEmailToRecoverPassword: async (_, { email }, context) => {
      const user = await UserController.getUserByEmail(email);
      const code = generateRandomCode();
      const recoveryCodeData = {
        code,
        userId: user.id,
      };
      await RecoveryCodeController.create(recoveryCodeData);
      const isEmailSent = await sendEmailRecoverPasswordCode(code, user.email);
      if (!isEmailSent) {
        throw emailError();
      }
      return true;
    },
  },
  Mutation: {
    updateUserPassword: async (_, { code, password }, context) => {
      try {
        await UserController.updateUserPassword(code, password);
        return true;
      } catch (error) {
        return error;
      }
    },
    updateUser: (_, { input }, context) => {
      validateAuth(context);
      const { user } = context;
      return UserController.updateUser(user.id, input);
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
