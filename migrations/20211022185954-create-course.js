'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('courses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      shortDescription: {
        type: Sequelize.STRING
      },
      isFree: {
        type: Sequelize.BOOLEAN
      },
      coverImageUrl: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.INTEGER
      },
      urlVideos: {
        type: Sequelize.STRING
      },
      category: {
        type: Sequelize.STRING
      },
      modality: {
        type: Sequelize.STRING
      },
      averageRate: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('courses');
  }
};