const { CourseController } = require('../controllers');
const { CATEGORIES } = require('../constants/course');
const { validateAuth, validateAuthAdmin } = require('../libs/auth');

const courseSharedProperties = `
  title: String
  description: String
  shortDescription: String
  isFree: Boolean
  coverImageUrl: String
  instructions: String
  price: Int
  urlVideos: String
  zoomLink: String
  zoomDatetime: Date
  category: Category
  modality: Modality

`;

const sharedProperties = `
  id: ID
  ${courseSharedProperties}
  averageRate: Int
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
`;

const courseReviewSharedProperties = `
  id: ID
  comment: String
  title: String
  courseId: Int
  rate: Float
  userId: Int
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
`;

const typeDef = `
    enum Modality {
      OFFLINE
      ONLINE
      PRESENTIAL
      CLASSROOM
    }
    enum Category {
      PERSONAL
      FAMILY
      MARRIAGE
    }
    type Course {
      ${sharedProperties}
    }
    type Courses {
      ${sharedProperties}
      user_courses: [UserCourseView]
    }
    type CourseReview {
      ${courseReviewSharedProperties}
    }
    type CourseReviewUser {
      course: Course
      ${courseReviewSharedProperties}
      user: User
    }
    type CourseView {
      ${sharedProperties}
      course_reviews: [CourseReviewUser]
      user_courses: UserCourseView
    }
    input CreateCourseReviewInput {
      comment: String!
      title: String!
      courseId: Int!
      rate: Float!
    }
    input CourseInput {
      ${courseSharedProperties}
    }
`;

const resolvers = {
  Query: {
    course: (_, { id }, context) => {
      // validateAuth(context);
      let userId = 0;
      if (context.user) {
        userId = context.user.id;
      }
      return CourseController.get(id, userId);
    },
    courseReviews: (_, { courseId }, context) => {
      validateAuth(context);
      return CourseController.getCourseReviews(courseId);
    },
    courses: (_, { title, category, modality }, context) => {
      let userId = 0;
      if (context.user) {
        userId = context.user.id;
      }
      return CourseController.getFilter(title, category, modality, userId);
    },
    categories: (_, args, context) => {
      // validateAuth(context);
      return CATEGORIES;
    },
  },
  Mutation: {
    saveCourseReview: (_, { input }, context) => {
      validateAuth(context);
      const { user } = context;
      const { comment, title, courseId, rate } = input;
      return CourseController.saveCourseReview(user.id, {
        comment,
        title,
        courseId,
        rate,
      });
    },
    saveCourse: (_, { input }, context) => {
      validateAuthAdmin(context);
      return CourseController.createCourse(input);
    },
    deleteCourse: (_, { id }, context) => {
      validateAuthAdmin(context);
      return CourseController.deleteCourse(id);
    },
    updateCourse: (_, { id, input }, context) => {
      validateAuthAdmin(context);
      return CourseController.updateCourse(id, input);
    },
    updateCourseReview: (_, { id, input }, context) => {
      validateAuth(context);
      return CourseController.updateCourseReview(id, input);
    },
    deleteCourseReview: (_, { id }, context) => {
      validateAuthAdmin(context);
      return CourseController.deleteCourseReview(id);
    },
  },
};

module.exports = {
  typeDef,
  resolvers,
};
