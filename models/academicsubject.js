'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AcademicSubject extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  AcademicSubject.init({
    subject_code: DataTypes.STRING,
    subject_name: DataTypes.STRING,
    department: DataTypes.STRING,
    semester: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'AcademicSubject',
  });
  return AcademicSubject;
};