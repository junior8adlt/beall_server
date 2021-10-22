const { typeDef: userSchema, resolvers: userResolvers } = require("./user");
const {
  typeDef: courseSchema,
  resolvers: courseResolvers,
} = require("./course");
const {
  typeDef: userMediaSchema,
  resolvers: userMediaResolvers,
} = require("./userMedia");

module.exports = {
  userSchema,
  userResolvers,
  courseSchema,
  courseResolvers,
  userMediaSchema,
  userMediaResolvers,
};
