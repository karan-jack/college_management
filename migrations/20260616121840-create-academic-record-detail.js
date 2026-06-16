'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('AcademicRecordDetails', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      academic_record_id: {
        type: Sequelize.BIGINT
      },
      subject_id: {
        type: Sequelize.BIGINT
      },
      marks_obtained: {
        type: Sequelize.DECIMAL
      },
      maximum_marks: {
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
    await queryInterface.dropTable('AcademicRecordDetails');
  }
};