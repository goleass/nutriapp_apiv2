'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Anamnesis', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true
      },
      clinical_case: {
        type: Sequelize.STRING,
        allowNull: false
      },
      anamnesis_date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      life_habits: {
        type: Sequelize.JSONB,
        allowNull: true
      },
      pathologies: {
        type: Sequelize.JSONB,
        allowNull: true
      },
      clinical_evaluation: {
        type: Sequelize.JSONB,
        allowNull: true
      },
      food_habits: {
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
    await queryInterface.dropTable('Anamnesis');
  }
};
