'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('FoodPlan', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false
      },
      references: {
        type: Sequelize.JSONB,
        allowNull: true
      },
      status: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      days: {
        type: Sequelize.JSONB,
        allowNull: true
      },
      user_patient_id: {
        type: Sequelize.UUID,
        allowNull: false,
        onDelete: 'CASCADE',
        references: { model: 'UserPatient', key: 'id',  }
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('FoodPlan');
  }
};
