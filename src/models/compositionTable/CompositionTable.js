const CompositionTable = (sequelize, DataTypes) => {
  const schema = sequelize.define('CompositionTable', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
    {
      tableName: 'CompositionTable'
    })

  return schema
}

module.exports = CompositionTable