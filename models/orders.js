'use strict';

module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    'orders',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      orderNumber: {
        type: DataTypes.UUID,
        defaultValue: sequelize.UUIDV4,
        primaryKey: true,
      },
      orderStatus: {
        type: DataTypes.ENUM('Paid', 'NotPaid', 'Cancelled', 'Refunded'),
        allowNull: false,
      },
      shippingStatus: {
        type: DataTypes.ENUM('Pending', 'Processing', 'Shipped', 'Delivered'),
        allowNull: false,
      },
      shippingGuide: {
        type: DataTypes.TEXT,
      },
      shippingMethod: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      paymentMethod: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      totalOrderAmount: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      shippingAddress: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      notesComments: {
        type: DataTypes.TEXT,
      },
      products: {
        type: DataTypes.ARRAY(DataTypes.JSONB),
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      deletedAt: {
        allowNull: true,
        type: DataTypes.DATE,
      },
    },
    {
      timestamps: true,
      paranoid: true,
      underscored: true,
      freezeTableName: true,
    },
  );

  Order.associate = function (models) {
    Order.belongsTo(models.user, {
      foreignKey: 'user_id',
      as: 'user',
    });
  };

  return Order;
};
