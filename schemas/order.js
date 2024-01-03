const { OrdersController } = require('../controllers');
const { validateAuth } = require('../libs/auth');
const { sendUserReceipt, sendOrderShipped } = require('../libs/email');
const { emailError } = require('../libs/errors');

const typeDef = `
enum OrderStatus {
  Paid
  NotPaid
  Cancelled
  Refunded
}

enum ShippingStatus {
  Pending
  Processing
  Shipped
  Delivered
}


type Order {
    id: ID
    orderNumber: String
    orderStatus: OrderStatus
    shippingStatus: ShippingStatus
    shippingGuide: String
    totalOrderAmount: Float
    shippingAddress: Address
    notesComments: String
    shippingMethod: String
    paymentMethod: String
    products: [ProductOrder]
    user: User
    createdAt: String
    updatedAt: String
    deletedAt: String    
}


type ProductOrder {
    product_id: ID
    name: String
    price: Float
    quantity: Int
    image: String
}

type Metrics {
    totalOrdersAmount: Float
    totalProducts: Int
}

input ProductOrderInput {
    product_id: ID
    name: String
    price: Float
    quantity: Int
    image: String
}

input OrderInput {
    orderStatus: OrderStatus
    shippingStatus: ShippingStatus
    totalOrderAmount: Float
    shippingGuide: String
    shippingMethod: String
    shippingPrice: Float
    paymentMethod: String
    shippingAddress: AddressInput
    notesComments: String
    products: [ProductOrderInput]
}
input ShippingStatusInput {
  shippingStatus: ShippingStatus
  shippingGuide: String
  }
    `;

const resolvers = {
  Query: {
    getUserOrders: (_, args, context) => {
      validateAuth(context);
      const { user } = context;
      return OrdersController.getOrdersByUser(user.id);
    },
    getAllOrders: (_, args, context) => {
      validateAuth(context);
      const { user } = context;
      return OrdersController.getOrders(user);
    },
  },
  Mutation: {
    createOrder: async (_, { input }, context) => {
      validateAuth(context);
      const { user } = context;
      const { shippingPrice, ...rest } = input;

      const totalProducts =
        rest.products.length > 0
          ? rest.products.reduce((acc, product) => {
              return acc + product.quantity;
            }, 0)
          : 0;
      const totalOrderFromProducts =
        rest.products.length > 0
          ? rest.products.reduce((acc, product) => {
              return acc + product.price * product.quantity;
            }, 0)
          : 0;

      const order = await OrdersController.createOrder(rest, user.id);
      const isEmailSent = sendUserReceipt(
        order,
        user.name,
        user.lastName,
        shippingPrice,
        user.email,
        totalProducts,
        totalOrderFromProducts,
      );
      if (!isEmailSent) {
        throw emailError();
      }
      return order;
    },
    updateOrder: (_, { id, input }, context) => {
      validateAuth(context);
      return OrdersController.updateOrder(id, input);
    },
    updateOrdershippingStatus: async (_, { id, input }, context) => {
      validateAuth(context);
      const { user } = context;
      const order = await OrdersController.updateOrdershippingStatus(id, input);
      if (input.shippingStatus === 'Shipped') {
        const isEmailSent = sendOrderShipped(order, user.email);
        if (!isEmailSent) {
          throw emailError();
        }
      }
      return order;
    },
    deleteOrder: (_, { id }, context) => {
      return OrdersController.deleteOrder(id);
    },
    getMetricsByDateRange: (_, { startDate, endDate }, context) => {
      validateAuth(context);
      return OrdersController.getMetricsByDateRange(startDate, endDate);
    },
  },
};

module.exports = {
  typeDef,
  resolvers,
};
