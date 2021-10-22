const merge = require("lodash.merge");
const {
  userSchema,
  userResolvers,
  courseSchema,
  courseResolvers,
  userMediaSchema,
  userMediaResolvers,
} = require("./schemas");
/**
 * PRECAUCIÓN
 * EN EL ORDEN QUE SE DEFINA LOS SCHEMAS Y LOS RESOLVERS
 * AGREGAR EN DICHO ORDEN EN type Query o type Mutation
 */
const globalTypeDefs = `
    # The implementation for this scalar is provided by the
    # 'GraphQLUpload' export from the 'graphql-upload' package
    # in the resolver map below.
    scalar Upload
    scalar Date
    ${userSchema}
    ${courseSchema}
    ${userMediaSchema}
    type Query {
      user(id: Int!): User
      login(email: String!, password: String!): Auth
      course(id: Int!): Course
      courses(title: String, category: Int): [Course]
      categories: [Category]
    }
    type Mutation {
      # USER MUTATIONS
      updateUserPassword(code: String!, password: String!): User
      updateUser(id: Int!, input: UserUpdateInput): User
      createUser(input: UserInput): User
      activateUser(code: String!): Boolean
      # USER MEDIA MUTATIONS
      uploadUserImage(file: Upload!): String
        # course(id: Int!): Course
        # courses(title: String, category: Int): [Course]
        # categories(): [Category]
    }
`;

module.exports = {
  globalTypeDefs,
  globalResolvers: merge(userResolvers, courseResolvers, userMediaResolvers),
};
