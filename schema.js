const merge = require('lodash.merge');
const {
  userSchema,
  userResolvers,
  collaboratorSchema,
  collaboratorResolvers,
  courseSchema,
  courseResolvers,
  userMediaSchema,
  userMediaResolvers,
  userCourseSchema,
  userCourseResolvers,
  mercadoPagoSchema,
  mercadoPagoResolvers,
  consultancieSchema,
  consultancieResolvers,
  couponCodeSchema,
  couponCodeResolvers,
} = require('./schemas');
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
    ${collaboratorSchema}
    ${courseSchema}
    ${userMediaSchema}
    ${userCourseSchema}
    ${mercadoPagoSchema}
    ${consultancieSchema}
    ${couponCodeSchema}
    type Query {
      # userSchema
      user: User
      login(email: String!, password: String!): Auth
      sendEmailToRecoverPassword(email: String!): Boolean
      # collaboratorSchema
      collaborators: [Collaborator]
      collaboratorById(id: ID!): Collaborator
      collaboratorBySlug(slug: String!): Collaborator
      # consultancieSchema
      consultancies: [Consultancie]
      consultancieById(id: ID!): Consultancie
      # courseSchema 
      course(id: Int!): CourseView
      courseReviews(courseId: Int): [CourseReviewUser]
      courses(title: String, category: Category, modality: Modality ): [Courses]
      courseReviewByCourseAndUser(courseId: Int!): CourseReviewUser
      categories: [String]
      # userMediaSchema
      authImageKit: ImageKitAuth
      # userCourseSchema
      userCourses(title: String): [UserCourse]
      # couponCodeSchema
      couponCode(id: ID!): CouponCode
      couponCodeList(id: Int): [CouponCode]
      validateCouponCode(couponCodeName: String!): CouponCode
    }
    type Mutation {
      # userSchema
      updateUserPassword(code: String!, password: String!): Boolean
      updateUser(input: UserUpdateInput): User
      createUser(input: UserInput): User
      activateUser(code: String!): Boolean
      # collaboratorSchema
      createCollaborator(input: CollaboratorInput): Collaborator
      updateCollaborator(id: Int!, input: CollaboratorInput): Collaborator
      deleteCollaborator(id: Int!): Boolean
      # consultancieSchema
      createConsultancie(input: ConsultancieInput): Consultancie
      updateConsultancie(id: Int!, input: ConsultancieInput): Consultancie
      deleteConsultancie(id: Int!): Boolean
      # courseSchema
      saveCourseReview(input: CreateCourseReviewInput): CourseReview
      saveCourse(input: CourseInput!): Course
      updateCourse(id: Int!, input: CourseInput): Course
      deleteCourse(id: Int!): Boolean
      updateCourseReview(id: Int!, input: CreateCourseReviewInput): CourseReview
      deleteCourseReview(id: Int!): Boolean
      # userCourseSchema
      createUserCourse(input: [Int]!, couponId: Int): Boolean
      # mercadoPagoSchema
      createPreference(input: [PreferenceItemsInput]!): String
      # couponCodeSchema
      saveCouponCode(input: CouponCodeInput!): CouponCode
      updateCouponCode(id: Int!, input: CouponCodeInput): CouponCode
      deleteCouponCode(id: Int!): Boolean
    }
`;

module.exports = {
  globalTypeDefs,
  globalResolvers: merge(
    userResolvers,
    collaboratorResolvers,
    courseResolvers,
    userMediaResolvers,
    userCourseResolvers,
    mercadoPagoResolvers,
    consultancieResolvers,
    couponCodeResolvers,
  ),
};
