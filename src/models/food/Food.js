const Food = (sequelize, DataTypes) => {
  const schema = sequelize.define('Food', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    base_unit: {
      type: DataTypes.STRING,
      allowNull: false
    },
    base_qty: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
  },
    {
      tableName: 'Food'
    })

  return schema
}

module.exports = Food