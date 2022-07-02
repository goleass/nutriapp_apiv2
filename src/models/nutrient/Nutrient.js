const Nutrient = (sequelize, DataTypes) => {
  const schema = sequelize.define('Nutrient', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    unit: {
      type: DataTypes.STRING,
      allowNull: false
    },
  },
    {
      tableName: 'Nutrient'
    })

  return schema
}

module.exports = Nutrient