"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Lecturer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Lecturer.hasMany(models.Course, {
        as: "lecturerCourse",
        foreignKey: "employeeId",
      });
    }
  }
  Lecturer.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      gender: DataTypes.STRING,
      employeeId: { type: DataTypes.STRING, primaryKey: true },
    },
    {
      sequelize,
      modelName: "Lecturer",
    }
  );
  return Lecturer;
};
