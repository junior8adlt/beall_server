const UserController = require('./user');
const CollaboratorController = require('./collaborator');
const RecoveryCodeController = require('./recoveryCode');
const CourseController = require('./course');
const MercadoPagoController = require('./mercadoPago');
const UserMediaController = require('./userMedia');
const PaymentLogController = require('./paymentLog');
const ConsultanciesController = require('./consultancies');
const StripeController = require('./stripe');

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
};
