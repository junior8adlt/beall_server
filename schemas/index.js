const { typeDef: userSchema, resolvers: userResolvers } = require("./user");
const {
  typeDef: courseSchema,
  resolvers: courseResolvers,
} = require("./course");
const {
  typeDef: userMediaSchema,
  resolvers: userMediaResolvers,
} = require("./userMedia");
const {
  typeDef: userCourseSchema,
  resolvers: userCourseResolvers,
} = require("./userCourse");

module.exports = {
  userSchema,
  userResolvers,
  courseSchema,
  courseResolvers,
  userMediaSchema,
  userMediaResolvers,
  userCourseSchema,
  userCourseResolvers,
};
