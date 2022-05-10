'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Anthropometry', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false
      },
      anthropometry_date: {
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
      circumferences: {
        type: Sequelize.JSONB,
        allowNull: true
      },
      bone_diameters: {
        type: Sequelize.JSONB,
        allowNull: true
      },
      body_composition: {
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
    await queryInterface.dropTable('Anthropometry');
  }
};
