'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Submission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Submission.init({
    student_id: DataTypes.BIGINT,
    task_id: DataTypes.BIGINT,
    score: DataTypes.DECIMAL,
    status: DataTypes.STRING,
    submitted_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Submission',
  });
  return Submission;
};