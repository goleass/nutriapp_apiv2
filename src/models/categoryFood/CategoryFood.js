const CategoryFood = (sequelize, DataTypes) => {
  const schema = sequelize.define('CategoryFood', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
    {
      tableName: 'CategoryFood'
    })

  return schema
}

module.exports = CategoryFood