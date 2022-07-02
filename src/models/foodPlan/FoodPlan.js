const FoodPlan = (sequelize, DataTypes) => {
  const schema = sequelize.define('FoodPlan', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    references: {
      type: DataTypes.JSONB,
      allowNull: true
    },
    days: {
      type: DataTypes.JSONB,
      allowNull: true
    },
  },
    {
      tableName: 'FoodPlan'
    })

  return schema
}

module.exports = FoodPlan