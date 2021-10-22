const generateRandomCode = () =>
  Math.random().toString(36).slice(2).toUpperCase();

module.exports = { generateRandomCode };
