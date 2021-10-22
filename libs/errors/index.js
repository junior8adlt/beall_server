const { toApolloError } = require("apollo-server-express");

const notFound = () => toApolloError(new Error("Not found"), "NOT_FOUND");
const emailError = () =>
  toApolloError(new Error("Can not send email"), "EMAIL_ERROR");

module.exports = { notFound, emailError };
