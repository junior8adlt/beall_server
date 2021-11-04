const { GraphQLUpload } = require('graphql-upload');
const path = require('path');
require('dotenv').config({ path: '.env.local' });
const { createWriteStream } = require('fs');
const ImageKit = require('imagekit');
const { validateAuth } = require('../libs/auth');

const typeDef = `
    type UserMedia {
        id: ID
        urlImage: String
        userId: Int
        createdAt: Date
        updatedAt: Date
        deletedAt: Date
    }
    type ImageKitAuth {
      token: String
      expire: Int
      signature: String
    }
`;

const resolvers = {
  Upload: GraphQLUpload,
  Query: {
    authImageKit: async (_, {}, context) => {
      const imagekit = new ImageKit({
        urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
        publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
        privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
      });
      const result = imagekit.getAuthenticationParameters();

      return result;
    },
  },
  Mutation: {
    uploadUserImage: async (_, { file }, context) => {
      // validateAuth(context);
      const { createReadStream, filename, mimetype, encoding } = await file;
      console.log('------------', { filename, mimetype, encoding });
      await new Promise((res) =>
        createReadStream()
          .pipe(
            createWriteStream(
              path.join(__dirname, '../uploads/images', filename)
            )
          )
          .on('close', res)
      );

      return { filename, mimetype, encoding };
    },
  },
};

module.exports = {
  typeDef,
  resolvers,
};
