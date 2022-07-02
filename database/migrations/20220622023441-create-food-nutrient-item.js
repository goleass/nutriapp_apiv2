'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('FoodNutrientItem', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true
      },
      qty: {
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      food_id: {
        type: Sequelize.UUID,
        allowNull: false,
        onDelete: 'CASCADE',
        references: { model: 'Food', key: 'id',  }
      },
      nutrient_id: {
        type: Sequelize.UUID,
        allowNull: false,
        onDelete: 'CASCADE',
        references: { model: 'Nutrient', key: 'id',  }
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('FoodNutrientItem');
  }
};
