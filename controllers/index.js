const UserController = require('./user');
const CollaboratorController = require('./collaborator');
const RecoveryCodeController = require('./recoveryCode');
const CourseController = require('./course');
const MercadoPagoController = require('./mercadoPago');
const UserMediaController = require('./userMedia');
const PaymentLogController = require('./paymentLog');
const ConsultanciesController = require('./consultancies');
const StripeController = require('./stripe');
const CouponCodeController = require('./couponCode');
const ProductsController = require('./products');
const AddressController = require('./address');
const OrdersController = require('./orders');
module.exports = {
  UserController,
  CollaboratorController,
  RecoveryCodeController,
  CourseController,
  MercadoPagoController,
  UserMediaController,
  PaymentLogController,
  ConsultanciesController,
  StripeController,
  CouponCodeController,
  ProductsController,
  AddressController,
  OrdersController,
};
