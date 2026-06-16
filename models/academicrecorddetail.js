'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AcademicRecordDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  AcademicRecordDetail.init({
    academic_record_id: DataTypes.BIGINT,
    subject_id: DataTypes.BIGINT,
    marks_obtained: DataTypes.DECIMAL,
    maximum_marks: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'AcademicRecordDetail',
  });
  return AcademicRecordDetail;
};