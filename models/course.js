'use strict';
const { CATEGORIES, MODALITY } = require('../constants/course');

module.exports = (sequelize, DataTypes) => {
  const course = sequelize.define(
    'course',
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
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      shortDescription: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      isFree: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      coverImageUrl: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      price: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      urlVideos: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      zoomLink: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      zoomDatetime: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      category: {
        type: DataTypes.ENUM(CATEGORIES),
        allowNull: false,
      },
      modality: {
        type: DataTypes.ENUM(MODALITY),
        allowNull: false,
      },
      averageRate: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0,
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
  course.associate = function (models) {
    course.hasMany(models.course_review, {
      foreignKey: 'course_id',
    });
    course.hasMany(models.user_course, {
      foreignKey: 'course_id',
    });
  };
  return course;
};
