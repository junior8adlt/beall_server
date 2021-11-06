// config.js
module.exports = {
  NODE_ENV: process.env.NODE_ENV || "development",
  HOST: process.env.HOST || "127.0.0.1",
  PORT: process.env.PORT || 3000,
  development: {
    mercadoPago:
      "TEST-2728193141713947-102913-e26d87d9f8251c0b64a1e794e340e3d6-345192359",
    IMAGEKIT_URL_ENDPOINT: "https://ik.imagekit.io/kmujnmitqkk",
    IMAGEKIT_PUBLIC_KEY: "public_IH8hHG5eKEegA2Dr4UP5XbuPP6Y=",
    IMAGEKIT_PRIVATE_KEY: "private_MzJWYkGIT7ZjwgBxrUiO2JJsEOM=",
    successUrl: "http://localhost:8080/feedback",
    failureUrl: "http://localhost:8080/feedback",
    pendingUrl: "http://localhost:8080/feedback",
  },
  production: {
    mercadoPago:
      "TEST-2728193141713947-102913-e26d87d9f8251c0b64a1e794e340e3d6-345192359",
    IMAGEKIT_URL_ENDPOINT: "",
    IMAGEKIT_PUBLIC_KEY: "",
    IMAGEKIT_PRIVATE_KEY: "",
    successUrl: "http://localhost:8080/feedback",
    failureUrl: "http://localhost:8080/feedback",
    pendingUrl: "http://localhost:8080/feedback",
  },
};
