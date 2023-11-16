"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Course.belongsToMany(models.Student, {
        through: models.Course_Student,
        foreignKey: "courseId",
      });
      Course.hasMany(models.Course_Student, {
        foreignKey: "courseId",
      });
      Course.belongsTo(models.Lecturer, {
        as: "lecturerCourse",
        foreignKey: {
          name: "employeeId",
        },
      });
    }
  }
  Course.init(
    {
      name: DataTypes.STRING,
      credits: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Course",
    }
  );
  return Course;
};
