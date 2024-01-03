const { typeDef: userSchema, resolvers: userResolvers } = require('./user');
const { typeDef: collaboratorSchema, resolvers: collaboratorResolvers } = require('./collaborator');

const { typeDef: courseSchema, resolvers: courseResolvers } = require('./course');
const { typeDef: userMediaSchema, resolvers: userMediaResolvers } = require('./userMedia');
const { typeDef: userCourseSchema, resolvers: userCourseResolvers } = require('./userCourse');
const { typeDef: mercadoPagoSchema, resolvers: mercadoPagoResolvers } = require('./mercadoPago');

const {
  typeDef: consultancieSchema,
  resolvers: consultancieResolvers,
} = require('./consultancies');
const { typeDef: productSchema, resolvers: productResolvers } = require('./product');
const { typeDef: addressSchema, resolvers: addressResolvers } = require('./address');
const { typeDef: couponCodeSchema, resolvers: couponCodeResolvers } = require('./coupon_code');
const { typeDef: orderSchema, resolvers: orderResolvers } = require('./order');

module.exports = {
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
  productSchema,
  productResolvers,
  addressSchema,
  addressResolvers,
  orderSchema,
  orderResolvers,
};
