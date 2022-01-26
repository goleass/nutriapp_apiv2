const UserProfessional = (sequelize, DataTypes) => {
  const schema = sequelize.define('UserProfessional', {
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
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    crn: {
      type: DataTypes.STRING,
      allowNull: true
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true
    }
  },
    {
      tableName: 'UserProfessional'
    })

  return schema
}

module.exports = UserProfessional