const { CourseController } = require("../controllers");
const { CATEGORIES } = require("../constants/course");
const { validateAuth } = require("../libs/auth");

const sharedProperties = `
  id: ID
  title: String
  description: String
  shortDescription: String
  isFree: Boolean
  coverImageUrl: String
  price: Int
  urlVideos: String
  category: Category
  modality: Modality
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
    }
    enum Category {
      PERSONAL
      FAMILY
      MARRIAGE
    }
    type Course {
      ${sharedProperties}
    }
    type CourseReview {
      ${courseReviewSharedProperties}
    }
    type CourseReviewUser {
      ${courseReviewSharedProperties}
      user: User
    }
    type CourseView {
      ${sharedProperties}
      course_reviews: [CourseReviewUser]
    }
    input CreateCourseReviewInput {
      comment: String!
      title: String!
      courseId: Int!
      rate: Float!
    }
`;

const resolvers = {
  Query: {
    course: (_, { id }, context) => {
      validateAuth(context);
      return CourseController.get(id);
    },
    courses: (_, { title, category }, context) => {
      validateAuth(context);
      return CourseController.getFilter(title, category);
    },
    categories: (_, args, context) => {
      validateAuth(context);
      return CATEGORIES;
    },
  },
  Mutation: {
    saveCourseReview: (_, { input }, context) => {
      validateAuth(context);
      const {
        user
      } = context
      const { comment, title, courseId, rate } = input;
      return CourseController.saveCourseReview(user.id, {
        comment,
        title,
        courseId,
        rate,
      });
    },
  },
};

module.exports = {
  typeDef,
  resolvers,
};
