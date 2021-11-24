"use strict";
module.exports = (sequelize, DataTypes) => {
  const payment_log = sequelize.define(
    "payment_log",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      status: DataTypes.STRING,
      payload: DataTypes.TEXT,
      mercadoPagoId: DataTypes.TEXT,
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
    }
  );
  payment_log.associate = function (models) {
    // associations can be defined here
  };
  return payment_log;
};
