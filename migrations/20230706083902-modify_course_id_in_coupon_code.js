'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('coupon_code', 'course_id', {
      type: Sequelize.BIGINT,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('coupon_code', 'course_id', {
      type: Sequelize.BIGINT,
      allowNull: false,
    });
  },
};
