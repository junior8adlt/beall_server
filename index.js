const { ApolloServer } = require('apollo-server-express');
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core');
const express = require('express');
const http = require('http');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const mercadopago = require('mercadopago');
require('dotenv').config({ path: __dirname + '/.env' });
const { UserController } = require('./controllers');
const expressRoutes = require('./routes');
const env = require('./config/env');

const { globalTypeDefs, globalResolvers } = require('./schema');

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
          const token = req.headers.authorization || '';
          if (!token) {
            return { user: null };
          }
          const user = await UserController.getUserByToken(token.replace('Bearer ', ''));
          return { user };
        } catch (error) {
          return { user: null };
        }
      },
    });
    await server.start();
    app.use(cors());
    app.use(bodyParser.json());
    app.use('/api', expressRoutes);

    server.applyMiddleware({ app });
    const { NODE_ENV, HOST, PORT } = env;
    await new Promise((resolve) => httpServer.listen(PORT, resolve));

    mercadopago.configure({
      access_token: env[NODE_ENV].mercadoPago,
    });
    console.log(`🚀 Graphql server ready at http://${HOST}:${PORT}${server.graphqlPath}`);
    console.log(`🚀 Express server ready at http://${HOST}:${PORT}/api`);
  } catch (error) {
    console.error({ error });
  }
}

startApolloServer(globalTypeDefs, globalResolvers);
