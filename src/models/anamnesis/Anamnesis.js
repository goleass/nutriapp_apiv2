const Anamnesis = (sequelize, DataTypes) => {
  const schema = sequelize.define('Anamnesis', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    clinical_case: {
      type: DataTypes.STRING,
      allowNull: false
    },
    anamnesis_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    life_habits: {
      type: DataTypes.JSONB,
      allowNull: true
    },
    pathologies: {
      type: DataTypes.JSONB,
      allowNull: true
    },
    clinical_evaluation: {
      type: DataTypes.JSONB,
      allowNull: true
    },
    food_habits: {
      type: DataTypes.JSONB,
      allowNull: true
    },
  },
    {
      tableName: 'Anamnesis'
    })

  return schema
}

module.exports = Anamnesis