// config.js
module.exports = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  HOST: process.env.HOST || '127.0.0.1',
  PORT: process.env.PORT || 3000,
  development: {
    mercadoPago: 'TEST-2728193141713947-102913-e26d87d9f8251c0b64a1e794e340e3d6-345192359',
    IMAGEKIT_URL_ENDPOINT: process.env.IMAGEKIT_URL_ENDPOINT,
    IMAGEKIT_PUBLIC_KEY: process.env.IMAGEKIT_PUBLIC_KEY,
    IMAGEKIT_PRIVATE_KEY: process.env.IMAGEKIT_PRIVATE_KEY,
    successUrl: 'http://localhost:8080/feedback',
    failureUrl: 'http://localhost:8080/feedback',
    pendingUrl: 'http://localhost:8080/feedback',
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
  },
  production: {
    mercadoPago: 'TEST-2728193141713947-102913-e26d87d9f8251c0b64a1e794e340e3d6-345192359',
    IMAGEKIT_URL_ENDPOINT: process.env.IMAGEKIT_URL_ENDPOINT,
    IMAGEKIT_PUBLIC_KEY: process.env.IMAGEKIT_PUBLIC_KEY,
    IMAGEKIT_PRIVATE_KEY: process.env.IMAGEKIT_PRIVATE_KEY,
    successUrl: 'http://localhost:8080/feedback',
    failureUrl: 'http://localhost:8080/feedback',
    pendingUrl: 'http://localhost:8080/feedback',
  },
};
