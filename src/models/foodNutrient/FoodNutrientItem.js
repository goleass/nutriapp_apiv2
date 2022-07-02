const FoodNutrientItem = (sequelize, DataTypes) => {
  const schema = sequelize.define('FoodNutrientItem', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    qty: {
      type: DataTypes.DOUBLE,
      allowNull: false
    }
  },
    {
      tableName: 'FoodNutrientItem'
    })

  return schema
}

module.exports = FoodNutrientItem