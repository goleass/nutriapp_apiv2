'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('EnergyExpenditure', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false
      },
      energy_expenditure_date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      tall: {
        type: Sequelize.DECIMAL(3, 2),
        allowNull: false
      },
      weight: {
        type: Sequelize.DECIMAL(5, 2),
        allowNull: false
      },
      formula: {
        type: Sequelize.INTEGER(2),
        allowNull: false
      },
      physical_activity_level: {
        type: Sequelize.DECIMAL(5, 3),
        allowNull: false
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
    await queryInterface.dropTable('EnergyExpenditure');
  }
};
