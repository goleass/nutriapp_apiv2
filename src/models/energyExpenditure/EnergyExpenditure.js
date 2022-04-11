const EnergyExpenditure = (sequelize, DataTypes) => {
  const schema = sequelize.define('EnergyExpenditure', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    energy_expenditure_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    tall: {
      type: DataTypes.DECIMAL(3,2),
      allowNull: false
    },
    weight: {
      type: DataTypes.DECIMAL(3,2),
      allowNull: false
    },
    formula: {
      type: DataTypes.INTEGER(2),
      allowNull: false
    },
    physical_activity_level: {
      type: DataTypes.DECIMAL(5,3),
      allowNull: false
    },
  },
    {
      tableName: 'EnergyExpenditure'
    })

  return schema
}

module.exports = EnergyExpenditure