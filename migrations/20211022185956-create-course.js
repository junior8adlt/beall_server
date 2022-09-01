'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('course', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      short_description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      is_free: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      cover_image_url: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      price: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      url_videos: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      zoom_link: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      zoom_datetime: {
        type: Sequelize.DATE,
        allowNull: true,
      },

      category: {
        type: Sequelize.ENUM(['PERSONAL', 'FAMILY', 'MARRIAGE']),
        allowNull: false,
      },
      modality: {
        type: Sequelize.ENUM(['OFFLINE', 'ONLINE', 'PRESENTIAL']),
        allowNull: false,
      },
      average_rate: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0,
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('course');
  },
};
