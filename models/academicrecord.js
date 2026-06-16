'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AcademicRecord extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  AcademicRecord.init({
    student_id: DataTypes.BIGINT,
    batch_id: DataTypes.BIGINT,
    semester: DataTypes.INTEGER,
    total_marks: DataTypes.DECIMAL,
    percentage: DataTypes.DECIMAL,
    cgpa: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'AcademicRecord',
  });
  return AcademicRecord;
};