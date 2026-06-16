'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('AcademicRecords', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      student_id: {
        type: Sequelize.BIGINT
      },
      batch_id: {
        type: Sequelize.BIGINT
      },
      semester: {
        type: Sequelize.INTEGER
      },
      total_marks: {
        type: Sequelize.DECIMAL
      },
      percentage: {
        type: Sequelize.DECIMAL
      },
      cgpa: {
        type: Sequelize.DECIMAL
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('AcademicRecords');
  }
};