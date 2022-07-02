'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('FoodPlanMealItem', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true
      },
      qty: {
        type: Sequelize.DOUBLE,
        allowNull: true
      },
      food_id: {
        type: Sequelize.UUID,
        allowNull: false,
        onDelete: 'CASCADE',
        references: { model: 'Food', key: 'id',  }
      },
      food_plan_meal_id: {
        type: Sequelize.UUID,
        allowNull: false,
        onDelete: 'CASCADE',
        references: { model: 'FoodPlanMeal', key: 'id',  }
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('FoodPlanMealItem');
  }
};
