const { GraphQLUpload } = require("graphql-upload");
const path = require("path");
const { createWriteStream } = require("fs");
const { validateAuth } = require("../libs/auth");

const typeDef = `
    type UserMedia {
        id: ID
        urlImage: String
        userId: Int
        createdAt: Date
        updatedAt: Date
        deletedAt: Date
    }
`;

const resolvers = {
  Upload: GraphQLUpload,
  Mutation: {
    uploadUserImage: async (_, { file }, context) => {
      // validateAuth(context);
      const { createReadStream, filename, mimetype, encoding } = await file;
      console.log("------------", { filename, mimetype, encoding });
      await new Promise((res) =>
        createReadStream()
          .pipe(
            createWriteStream(
              path.join(__dirname, "../uploads/images", filename)
            )
          )
          .on("close", res)
      );

      return { filename, mimetype, encoding };
    },
  },
};

module.exports = {
  typeDef,
  resolvers,
};
