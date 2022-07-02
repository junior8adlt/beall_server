'use strict';

module.exports = (sequelize, DataTypes) => {
  const Collaborator = sequelize.define(
    'collaborator',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      slug: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      degree: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      presentationDesc: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      cellphone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      gender: {
        type: DataTypes.ENUM(['MALE', 'FAMALE']),
        allowNull: false,
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      profileImageUrl: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      consultancies: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
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
  Collaborator.associate = function (models) {
    // associations can be defined here
  };
  return Collaborator;
};
