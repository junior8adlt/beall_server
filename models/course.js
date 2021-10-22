'use strict';
module.exports = (sequelize, DataTypes) => {
  const course = sequelize.define('course', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    shortDescription: DataTypes.STRING,
    isFree: DataTypes.BOOLEAN,
    coverImageUrl: DataTypes.STRING,
    price: DataTypes.INTEGER,
    urlVideos: DataTypes.STRING,
    category: DataTypes.STRING,
    modality: DataTypes.STRING,
    averageRate: DataTypes.INTEGER
  }, {});
  course.associate = function(models) {
    // associations can be defined here
  };
  return course;
};