"use strict";
const { user: UserModel } = require('./index');

module.exports = (sequelize, DataTypes) => {
  const RecoveryCode = sequelize.define(
    "recovery_code",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      code: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: UserModel,
          key: 'id'
        }
      },
      used: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
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
    }
  );
  RecoveryCode.associate = function (models) {
    RecoveryCode.belongsTo(models.user, {
      targetKey: 'id',
      foreignKey: 'user_id'
    });
  };
  return RecoveryCode;
};
