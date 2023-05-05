const { CourseController, UserController } = require('../controllers');
const { validateAuth } = require('../libs/auth');
const { emailError } = require('../libs/errors');
const { sendEmailWhenUserBuyCourse } = require('../libs/email');
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
        const courseName = await CourseController.getCourseName(input);
        await UserController.createManyUserCourse(manyUserCourses, couponId);
        const isEmailSent = await sendEmailWhenUserBuyCourse(
          courseName.title,
          'fam.be.all@gmail.com',
        );
        if (!isEmailSent) {
          throw emailError();
        }
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
