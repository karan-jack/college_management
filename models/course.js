'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Course.init({
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    category_id: DataTypes.BIGINT,
    created_by_admin: DataTypes.BIGINT,
    difficulty: DataTypes.STRING,
    thumbnail_url: DataTypes.STRING,
    estimated_hours: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Course',
  });
  return Course;
};