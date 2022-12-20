const { CourseController, UserController } = require('../controllers');
const { validateAuth } = require('../libs/auth');

const typeDef = `
  type UserCourse {
    id: ID
    isPay: Boolean
    userId: Int
    course: Course
    createdAt: Date
    updatedAt: Date
    deletedAt: Date
  }
  type UserCourseView {
    id: ID
    isPay: Boolean
    userId: Int
    courseId: Int
    createdAt: Date
    updatedAt: Date
    deletedAt: Date
  }
`;

const resolvers = {
  Query: {
    userCourses: (_, { title }, context) => {
      validateAuth(context);
      const { user } = context;
      return CourseController.getUserCourses(user.id, title);
    },
  },
  Mutation: {
    createUserCourse: async (_, { input, couponId }, context) => {
      validateAuth(context);
      const { user } = context;
      try {
        const manyUserCourses = input.map((courseId) => ({
          courseId,
          userId: user.id,
          isPay: true,
        }));
        await UserController.createManyUserCourse(manyUserCourses, couponId);
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
