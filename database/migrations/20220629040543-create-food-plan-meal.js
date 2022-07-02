'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('FoodPlanMeal', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false
      },
      meal_time: {
        type: Sequelize.STRING,
        allowNull: false
      },
      food_plan_id: {
        type: Sequelize.UUID,
        allowNull: false,
        onDelete: 'CASCADE',
        references: { model: 'FoodPlan', key: 'id',  }
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('FoodPlanMeal');
  }
};
