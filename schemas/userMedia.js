const ImageKit = require("imagekit");
const env = require("../config/env");

const typeDef = `
  type ImageKitAuth {
    token: String
    expire: Int
    signature: String
  }
`;

const resolvers = {
  Query: {
    authImageKit: () => {
      const { NODE_ENV } = env;
      const enviroment = env[NODE_ENV]
      const imagekit = new ImageKit({
        urlEndpoint: enviroment.IMAGEKIT_URL_ENDPOINT,
        publicKey: enviroment.IMAGEKIT_PUBLIC_KEY,
        privateKey: enviroment.IMAGEKIT_PRIVATE_KEY,
      });
      return imagekit.getAuthenticationParameters();
    },
  },
};

module.exports = {
  typeDef,
  resolvers,
};
