const { AuthenticationError } = require("apollo-server-express");

const validateAuth = (context) => {
  if (!context.user) {
    throw new AuthenticationError("Invalid token");
  }
  return;
};

module.exports = { validateAuth };
