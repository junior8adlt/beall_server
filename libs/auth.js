const { AuthenticationError } = require('apollo-server-express');
const { ROLES } = require('../constants/user');
const { UserController } = require('../controllers');

const validateAuth = (context) => {
  if (!context.user) {
    throw new AuthenticationError('Invalid token');
  }
  return;
};

const validateAuthAdmin = (context) => {
  const [ADMIN] = ROLES;
  if (!context.user || context.user.role !== ADMIN) {
    throw new AuthenticationError('Invalid token');
  }
  return;
};

const validateAuthToken = async (req, res, next) => {
  try {
    // get the user token from the headers
    const token = req.headers.authorization || '';
    if (!token) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    // try to retrieve a user with the token
    const user = await UserController.getUserByToken(token.replace('Bearer ', ''));
    if (!user) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    req.user = user;
    return next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = { validateAuth, validateAuthAdmin, validateAuthToken };
