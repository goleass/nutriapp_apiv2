const Sequelize = require('sequelize')
const config = require('./database')

const sequelize = new Sequelize(config['development'])

module.exports = sequelize