const { v4: uuidv4 } = require('uuid');
const { orders: OrderModel, user: UserModel, products: ProductModel } = require('../models');
const { Op } = require('sequelize');
const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot('6572384363:AAHwOXS652jZGFay772lPIma8nNW12eZLqc', { polling: true });

class Order {
  static async createOrder(data, userId) {
    const user = await UserModel.findByPk(userId);
    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    const products = data.products;

    for (const productData of products) {
      const product = await ProductModel.findByPk(productData.product_id);
      if (!product) {
        throw new Error(`Producto no encontrado: ${productData.name}`);
      }
      if (product.stock < productData.quantity) {
        throw new Error(`No hay stock suficiente para ${productData.name}`);
      }
    }
    try {
      const order = await OrderModel.create({
        ...data,
        user_id: userId,
        orderNumber: uuidv4(),
      });
      for (const productData of products) {
        const product = await ProductModel.findByPk(productData.product_id);
        product.stock = product.stock - productData.quantity;
        await product.save();
      }
      bot.sendMessage(
        '1736622560',
        `Se ha realizado una nueva orden de compra con el número ${
          order.dataValues.orderNumber
        } por un total de $${order.dataValues.totalOrderAmount}
        \n\nLos productos son: ${products
          .map((product) => `${product.name} x ${product.quantity}`)
          .join('\n')}
        \nEl usuario es: ${user.name} ${user.lastName}
        \nEl email es: ${user.email}
        \nEl teléfono es: ${user.cellphone}
        \nLa dirección es: ${order.dataValues.shippingAddress.street} ${
          order.dataValues.shippingAddress.number
        } ${order.dataValues.shippingAddress.interior ?? ''}
        \nEl código postal es: ${order.dataValues.shippingAddress.zipCode}
        \nLa localidad es: ${order.dataValues.shippingAddress.colony}
        \nLa ciudad es: ${order.dataValues.shippingAddress.city}
        \nEl país es: México
        \nEl método de pago es: ${
          order.dataValues.paymentMethod === 'stripe' ? 'Tarjeta de crédito o debito' : 'Paypal'
        }
        \nLa fecha de creación es: ${new Date(order.dataValues.createdAt).toLocaleDateString()}
        `,
      );
      return order;
    } catch (error) {
      console.error(error, '--------------error');
      throw new Error('Error al crear la orden');
    }
  }
  static async updateOrder(id, data) {
    try {
      if (data.deletedAt === null || data.deletedAt === undefined) {
        delete data.deletedAt;
      }
      const order = await OrderModel.findByPk(id);
      const product = await ProductModel.findByPk(data.product_id);
      if (!product) {
        throw new Error('Producto no encontrado');
      }
      if (product.stock < data.quantity) {
        throw new Error('No hay stock suficiente');
      }
      product.stock = product.stock - data.quantity;
      if (!order) {
        throw new Error('Orden no encontrada');
      }
      await product.save();

      return order.update(data);
    } catch (error) {
      console.error(error, '--------------error');
      throw new Error('Error al actualizar la orden');
    }
  }

  static async updateOrdershippingStatus(id, data) {
    try {
      const order = await OrderModel.findByPk(id);
      if (!order) {
        throw new Error('Orden no encontrada');
      }
      order.shippingStatus = data.shippingStatus;
      if (order.shippingStatus === 'Shipped') {
        order.shippingGuide = data.shippingGuide;
      }
      return order.save();
    } catch (error) {
      console.error(error, '--------------error');
      throw new Error('Error al actualizar la orden');
    }
  }
  static async deleteOrder(id) {
    try {
      return OrderModel.destroy({ where: { id } });
    } catch (error) {
      console.error(error, '--------------error');
      throw new Error('Error al eliminar la orden');
    }
  }
  static async getOrdersByUser(userId) {
    try {
      const user = await UserModel.findByPk(userId);
      if (!user) {
        throw new Error('Usuario no encontrado');
      }
      return OrderModel.findAll({ where: { user_id: userId } });
    } catch (error) {
      console.error(error, '--------------error');
      throw new Error('Error al obtener las ordenes');
    }
  }
  static async getOrders(userThatBuyed) {
    try {
      const user = await UserModel.findByPk(userThatBuyed.id);
      let order = await OrderModel.findAll();
      order = order.map((order) => {
        if (userThatBuyed) {
          order.user = user;
        }
        return order;
      });
      return order;
    } catch (error) {
      console.error(error, '--------------error');
      throw new Error('Error al obtener las ordenes');
    }
  }
  static async getMetricsByDateRange(startDate, endDate) {
    try {
      const startDateFormatted = new Date(startDate);
      const endDateFormatted = new Date(endDate);

      const totalOrdersAmount = await OrderModel.sum('totalOrderAmount', {
        where: { createdAt: { [Op.between]: [startDateFormatted, endDateFormatted] } },
      });
      const orders = await OrderModel.findAll({
        where: { createdAt: { [Op.between]: [startDateFormatted, endDateFormatted] } },
      });

      const totalProducts =
        orders.length > 0
          ? orders
              .map((order) => order.products.reduce((acc, product) => acc + product.quantity, 0))
              .reduce((acc, quantity) => acc + quantity, 0)
          : 0;

      return {
        totalOrdersAmount,
        totalProducts,
      };
    } catch (error) {
      console.error(error, '--------------error');
      throw new Error('Error al obtener las ordenes');
    }
  }
}

module.exports = Order;
