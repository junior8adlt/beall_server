"use strict";
module.exports = (sequelize, DataTypes) => {
  const UserCourse = sequelize.define(
    "user_course",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      isPay: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
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
  UserCourse.associate = function (models) {
    // associations can be defined here
    UserCourse.belongsTo(models.user, {
      targetKey: "id",
      foreignKey: "user_id",
    });
    UserCourse.belongsTo(models.course, {
      targetKey: "id",
      foreignKey: "course_id",
    });
  };
  return UserCourse;
};
