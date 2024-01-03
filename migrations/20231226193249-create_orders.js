'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      order_number: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      order_status: {
        type: Sequelize.ENUM('Paid', 'NotPaid', 'Cancelled', 'Refunded'),
        allowNull: false,
      },
      shipping_status: {
        type: Sequelize.ENUM('Pending', 'Processing', 'Shipped', 'Delivered'),
        allowNull: false,
      },
      shipping_guide: {
        type: Sequelize.TEXT,
      },
      shipping_method: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      payment_method: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      total_order_amount: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      shipping_address: {
        type: Sequelize.JSON,
        allowNull: false,
      },
      notes_comments: {
        type: Sequelize.TEXT,
      },
      products: {
        type: Sequelize.ARRAY(Sequelize.JSONB),
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'user',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      deleted_at: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('orders');
  },
};
