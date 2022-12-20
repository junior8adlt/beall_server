'use strict';

module.exports = (sequelize, DataTypes) => {
  const CouponCode = sequelize.define(
    'coupon_code',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      couponCodeName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      courseId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: {
            tableName: 'course',
            schema: 'public',
          },
          key: 'id',
        },
      },
      discountPercentage: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      expirationTime: {
        type: DataTypes.DATE,
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
    },
  );
  CouponCode.associate = function (models) {
    CouponCode.belongsTo(models.course, {
      targetKey: 'id',
      foreignKey: 'course_id',
    });
  };
  return CouponCode;
};
