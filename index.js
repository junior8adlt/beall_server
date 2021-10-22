const { ApolloServer } = require("apollo-server-express");
const { ApolloServerPluginDrainHttpServer } = require("apollo-server-core");
const express = require("express");
const http = require("http");
const { graphqlUploadExpress } = require("graphql-upload");

const { UserController } = require("./controllers");
// Only test
// const { sendEmailCode } = require("./libs/email");

const { globalTypeDefs, globalResolvers } = require("./schema");

async function startApolloServer(typeDefs, resolvers) {
  try {
    const app = express();
    const httpServer = http.createServer(app);
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
      context: async ({ req }) => {
        try {
          // get the user token from the headers
          const token = req.headers.authorization || "";
          if (!token) {
            return { user: null };
          }
          // try to retrieve a user with the token
          const user = await UserController.getUserByToken(
            token.replace("Bearer ", "")
          );
          return { user };
        } catch (error) {
          return { user: null };
        }
      },
    });
    await server.start();
    // This middleware should be added before calling `applyMiddleware`.
    app.use(graphqlUploadExpress());
    server.applyMiddleware({ app });
    await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
    console.log(
      `🚀 Server ready at http://localhost:4000${server.graphqlPath}`
    );
    // await sendEmailCode("123456789")
  } catch (error) {
    console.error({ error });
  }
}

startApolloServer(globalTypeDefs, globalResolvers);
