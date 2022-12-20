const { toApolloError } = require('apollo-server-express');

const notFound = () => toApolloError(new Error('Not found'), 'NOT_FOUND');
const emailError = () => toApolloError(new Error('No se pudo enviar el correo'), 'EMAIL_ERROR');

const invalidComment = () => toApolloError(new Error('Invalid comment'), 'INVALID_COMMENT');

const couponExpire = () => toApolloError(new Error('Cupon expirado'), 'COUPON_EXPIRE');

module.exports = { notFound, emailError, invalidComment, couponExpire };
