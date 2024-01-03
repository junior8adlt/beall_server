const { address: AddressModel, user: UserModel } = require('../models');

class Address {
  static async createAddress(data, userId) {
    const user = await UserModel.findByPk(userId);
    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    try {
      return AddressModel.create({
        ...data,
        user_id: userId,
      });
    } catch (error) {
      console.error(error, '--------------error');
      throw new Error('Error al crear la dirección');
    }
  }
  static async getUserAddresses(userId) {
    const conditional = {
      where: {
        user_id: userId,
      },
    };
    const addressesModel = await AddressModel.findAll(conditional);
    return addressesModel;
  }
  static async updateAddress(id, data) {
    try {
      if (data.deletedAt === null || data.deletedAt === undefined) {
        delete data.deletedAt;
      }
      const address = await AddressModel.findByPk(id);

      if (!address) {
        throw new Error('Dirección no encontrada');
      }

      return address.update(data);
    } catch (error) {
      throw new Error('Error al actualizar la dirección');
    }
  }
  static async deleteAddress(id) {
    try {
      const address = await AddressModel.findByPk(id);
      if (!address) {
        throw new Error('Dirección no encontrada');
      }
      return address.destroy();
    } catch (error) {
      throw new Error('Error al eliminar la dirección');
    }
  }
}

module.exports = Address;
