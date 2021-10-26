'use strict';
module.exports = (sequelize, DataTypes) => {
  const CourseReview = sequelize.define('course_review', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    userId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: {
          tableName: "user",
          schema: "public",
        },
        key: "id",
      },
    },
    courseId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: {
          tableName: "course",
          schema: "public",
        },
        key: "id",
      },
    },
    comment: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    rate: {
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
  }, {
    timestamps: true,
    paranoid: true,
    underscored: true,
    freezeTableName: true,
  });
  CourseReview.associate = function(models) {
    // associations can be defined here
    CourseReview.belongsTo(models.user, {
      targetKey: "id",
      foreignKey: "user_id",
    });
    CourseReview.belongsTo(models.course, {
      targetKey: "id",
      foreignKey: "course_id",
    });
  };
  return CourseReview;
};