const sequelize = require('../../config/sequelize')

const Sequelize = require('sequelize')

const anamnesis = require('./anamnesis/Anamnesis')
const userPatient = require('./userPatient/UserPatient')
const userProfessional = require('./userProfessional/UserProfessional')

// const compositionTable = require('./foodNutrient/CompositionTable')
// const categoryFood = require('./foodNutrient/CategoryFood')
// const food = require('./foodNutrient/Food')
// const foodNutrientItem = require('./foodNutrient/FoodNutrientItem')
// const nutrient = require('./foodNutrient/Nutrient')

const Anamnesis = anamnesis(sequelize, Sequelize.DataTypes)
const UserPatient = userPatient(sequelize, Sequelize.DataTypes)
const UserProfessional = userProfessional(sequelize, Sequelize.DataTypes)

// const CompositionTable = compositionTable(sequelize, Sequelize.DataTypes)
// const CategoryFood = categoryFood(sequelize, Sequelize.DataTypes)
// const Food = food(sequelize, Sequelize.DataTypes)
// const FoodNutrientItem = foodNutrientItem(sequelize, Sequelize.DataTypes)
// const Nutrient = nutrient(sequelize, Sequelize.DataTypes)

// Tables Relationship
UserProfessional.hasMany(UserPatient, {
  foreignKey: 'user_professional_id'
})

UserPatient.belongsTo(UserProfessional, {
  foreignKey: 'user_professional_id'
})

UserPatient.hasMany(Anamnesis, {
  foreignKey: 'user_patient_id'
})

Anamnesis.belongsTo(UserPatient, {
  foreignKey: 'user_patient_id'
})

// CategoryFood.belongsTo(CompositionTable, {
//   constraint: true,
//   foreignKey: 'composition_table_id'
// })

// Food.belongsTo(CategoryFood, {
//   constraint: true,
//   foreignKey: 'category_food_id'
// })

// Nutrient.belongsToMany(Food, {
//   through: {
//     model: FoodNutrientItem,
//   },
//   foreignKey: 'nutrient_id',
//   constraint: true
// })

// Food.belongsToMany(Nutrient, {
//   through: {
//     model: FoodNutrientItem,
//   },
//   foreignKey: 'food_id',
//   constraint: true
// })

// Food.hasMany(FoodNutrientItem, { foreignKey: 'food_id' })
// FoodNutrientItem.belongsTo(Food, { foreignKey: 'food_id' })
// Nutrient.hasMany(FoodNutrientItem, { foreignKey: 'nutrient_id' })
// FoodNutrientItem.belongsTo(Food, { foreignKey: 'nutrient_id' })

const db = {

  // Food Composition tables
  // CompositionTable,
  // CategoryFood,
  // Food,
  // FoodNutrientItem,
  // Nutrient,

  // User
  UserProfessional,
  UserPatient,
  Anamnesis,

  // Sequelize
  sequelize
}

module.exports = db