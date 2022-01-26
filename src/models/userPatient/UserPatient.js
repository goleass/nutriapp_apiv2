const UserPatient = (sequelize, DataTypes) => {
  const schema = sequelize.define('UserPatient', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true
    },
    birth_data: {
      type: DataTypes.DATE,
      allowNull: false
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
    {
      tableName: 'UserPatient'
    })

  return schema
}

module.exports = UserPatient