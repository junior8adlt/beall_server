const { products: ProductModel } = require('../models');

class Product {
  static async createProduct(data) {
    try {
      console.log(data, '--------------data');
      return ProductModel.create(data);
    } catch (error) {
      console.error(error, '--------------error');
      throw new Error('Error al crear el producto');
    }
  }
  static async updateProduct(id, data) {
    try {
      if (data.deletedAt === null || data.deletedAt === undefined) {
        delete data.deletedAt;
      }
      const product = await ProductModel.findByPk(id);

      if (!product) {
        throw new Error('Producto no encontrado');
      }

      return product.update(data);
    } catch (error) {
      console.error(error, '--------------error');
      throw new Error('Error al actualizar el producto');
    }
  }

  static async deleteProduct(id) {
    try {
      return ProductModel.destroy({ where: { id } });
    } catch (error) {
      console.error(error, '--------------error');
      throw new Error('Error al eliminar el producto');
    }
  }
  static async getProducts() {
    const conditional = { where: {} };
    const productsModel = await ProductModel.findAll(conditional);
    return productsModel;
  }
}

module.exports = Product;
