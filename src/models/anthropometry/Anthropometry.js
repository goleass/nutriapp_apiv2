const Anthropometry = (sequelize, DataTypes) => {
  const schema = sequelize.define('Anthropometry', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    anthropometry_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    tall: {
      type: DataTypes.DECIMAL(5,2),
      allowNull: false
    },
    weight: {
      type: DataTypes.DECIMAL(5,2),
      allowNull: false
    },
    circumferences: {
      type: DataTypes.JSONB,
      allowNull: true
    },
    bone_diameters: {
      type: DataTypes.JSONB,
      allowNull: true
    },
    body_composition: {
      type: DataTypes.JSONB,
      allowNull: true
    },
  },
    {
      tableName: 'Anthropometry'
    })

  return schema
}

module.exports = Anthropometry