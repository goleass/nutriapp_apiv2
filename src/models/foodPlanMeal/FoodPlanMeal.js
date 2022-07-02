const FoodPlanMeal = (sequelize, DataTypes) => {
  const schema = sequelize.define('FoodPlanMeal', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    meal_time: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
    {
      tableName: 'FoodPlanMeal'
    })

  return schema
}

module.exports = FoodPlanMeal