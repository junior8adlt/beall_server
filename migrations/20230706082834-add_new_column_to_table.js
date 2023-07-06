'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('coupon_code', 'is_global', {
      type: Sequelize.BOOLEAN,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('coupon_code', 'is_global');
  },
};
