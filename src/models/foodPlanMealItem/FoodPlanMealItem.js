const FoodPlanMealItem = (sequelize, DataTypes) => {
  const schema = sequelize.define('FoodPlanMealItem', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    qty: {
      type: DataTypes.DOUBLE,
      allowNull: true
    }
  },
    {
      tableName: 'FoodPlanMealItem'
    })

  return schema
}

module.exports = FoodPlanMealItem