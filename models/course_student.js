"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Course_Student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Course_Student.belongsTo(models.Course, {
        foreignKey: "courseId",
      });
      Course_Student.belongsTo(models.Student);
    }
  }
  Course_Student.init(
    {
      studentId: DataTypes.STRING,
      courseId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Course_Student",
    }
  );
  return Course_Student;
};
