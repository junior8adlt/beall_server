'use strict';

module.exports = (sequelize, DataTypes) => {
  const Consultancie = sequelize.define(
    'consultancies',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      title: {
        type: DataTypes.STRING,
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
  Consultancie.associate = function (models) {
    Consultancie.belongsToMany(models.collaborator, {
      through: 'collaborator_consultancies',
      as: 'collaborators',
      foreignKey: 'consultancieId',
    });
  };
  return Consultancie;
};
