'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Food', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false
      },
      base_unit: {
        type: Sequelize.STRING,
        allowNull: false
      },
      base_qty: {
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Food');
  }
};
