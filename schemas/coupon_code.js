const { CouponCodeController } = require('../controllers');
const { validateAuth, validateAuthAdmin } = require('../libs/auth');

const typeDef = `
    type CouponCode {
        id: ID
        couponCodeName: String
        isGlobal: Boolean
        discountPercentage: Int
        courseId: Int
        course: Course
        expirationTime: Date
        createdAt: Date
        updatedAt: Date
        deletedAt: Date
    }
  input CouponCodeInput {
        couponCodeName: String
        discountPercentage: Int
        courseId: Int
        isGlobal: Boolean
        expirationTime: Date
    }
`;

const resolvers = {
  Query: {
    couponCode: (_, { id }, context) => {
      validateAuth(context);
      return CouponCodeController.getCoupon(id);
    },
    couponCodeList: (_, { id }, context) => {
      validateAuth(context);
      return CouponCodeController.getAllCoupons(id);
    },
    validateCouponCode: (_, { couponCodeName }, context) => {
      validateAuth(context);
      return CouponCodeController.validateCoupon(couponCodeName);
    },
  },
  Mutation: {
    saveCouponCode: (_, { input }, context) => {
      validateAuthAdmin(context);
      return CouponCodeController.createCoupon(input);
    },
    updateCouponCode: (_, { id, input }, context) => {
      validateAuthAdmin(context);
      return CouponCodeController.updateCoupon(id, input);
    },
    deleteCouponCode: (_, { id }, context) => {
      validateAuthAdmin(context);
      return CouponCodeController.deleteCoupon(id);
    },
  },
};

module.exports = {
  typeDef,
  resolvers,
};
