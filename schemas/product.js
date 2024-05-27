const { ProductsController } = require('../controllers');
const { validateAuthAdmin } = require('../libs/auth');

const typeDef = `
type Product {
  id: ID
  name: String
  shortDescription: String
  description : String
  price: Float
  images: [String]
  stock: Int
  isDigital: Boolean
  digitalContent: String
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
}

input ProductInput {
    name: String
    shortDescription: String
    description : String
    price: Float
    images: [String]
    stock: Int
    isDigital: Boolean
    digitalContent: String
    }
    `;
const resolvers = {
  Query: {
    products: (_, args, context) => {
      return ProductsController.getProducts();
    },
  },
  Mutation: {
    createProduct: (_, { input }, context) => {
      validateAuthAdmin(context);
      return ProductsController.createProduct(input);
    },
    updateProduct: (_, { id, input: data }, context) => {
      validateAuthAdmin(context);
      return ProductsController.updateProduct(id, data);
    },
    deleteProduct: (_, { id }, context) => {
      validateAuthAdmin(context);
      return ProductsController.deleteProduct(id);
    },
  },
};

module.exports = {
  typeDef,
  resolvers,
};
