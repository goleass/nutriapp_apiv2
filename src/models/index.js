const sequelize = require('../../config/sequelize')

const Sequelize = require('sequelize')

const anamnesis = require('./anamnesis/Anamnesis')
const foodPlan = require('./foodPlan/FoodPlan')
const food = require('./food/Food')
const compositionTable = require('./compositionTable/CompositionTable')
const energyExpenditure = require('./energyExpenditure/EnergyExpenditure')
const anthropometry = require('./anthropometry/Anthropometry')
const userPatient = require('./userPatient/UserPatient')
const userProfessional = require('./userProfessional/UserProfessional')

// const compositionTable = require('./foodNutrient/CompositionTable')
const categoryFood = require('./categoryFood/CategoryFood')
// const food = require('./foodNutrient/Food')
const foodNutrientItem = require('./foodNutrient/FoodNutrientItem')
const foodPlanMeal = require('./foodPlanMeal/FoodPlanMeal')
const foodPlanMealItem = require('./foodPlanMealItem/FoodPlanMealItem')
const nutrient = require('./nutrient/Nutrient')

const Anamnesis = anamnesis(sequelize, Sequelize.DataTypes)
const FoodPlan = foodPlan(sequelize, Sequelize.DataTypes)
const FoodPlanMeal = foodPlanMeal(sequelize, Sequelize.DataTypes)
const FoodPlanMealItem = foodPlanMealItem(sequelize, Sequelize.DataTypes)
const Food = food(sequelize, Sequelize.DataTypes)
const CompositionTable = compositionTable(sequelize, Sequelize.DataTypes)
const EnergyExpenditure = energyExpenditure(sequelize, Sequelize.DataTypes)
const Anthropometry = anthropometry(sequelize, Sequelize.DataTypes)
const UserPatient = userPatient(sequelize, Sequelize.DataTypes)
const UserProfessional = userProfessional(sequelize, Sequelize.DataTypes)

// const CompositionTable = compositionTable(sequelize, Sequelize.DataTypes)
const CategoryFood = categoryFood(sequelize, Sequelize.DataTypes)
// const Food = food(sequelize, Sequelize.DataTypes)
const FoodNutrientItem = foodNutrientItem(sequelize, Sequelize.DataTypes)
const Nutrient = nutrient(sequelize, Sequelize.DataTypes)

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

UserPatient.hasMany(EnergyExpenditure, {
  foreignKey: 'user_patient_id'
})

EnergyExpenditure.belongsTo(UserPatient, {
  foreignKey: 'user_patient_id'
})

UserPatient.hasMany(Anthropometry, {
  foreignKey: 'user_patient_id'
})

Anthropometry.belongsTo(UserPatient, {
  foreignKey: 'user_patient_id'
})

UserPatient.hasMany(FoodPlan, {
  foreignKey: 'user_patient_id'
})

FoodPlan.belongsTo(UserPatient, {
  foreignKey: 'user_patient_id'
})

CategoryFood.belongsTo(CompositionTable, {
  constraint: true,
  foreignKey: 'composition_table_id'
})

Food.belongsTo(CategoryFood, {
  constraint: true,
  foreignKey: 'category_food_id'
})

FoodPlan.hasMany(FoodPlanMeal, {
  foreignKey: 'food_plan_id'
})

FoodPlanMeal.belongsTo(FoodPlan, {
  constraint: true,  
  foreignKey: 'food_plan_id'
})

Food.belongsToMany(FoodPlanMeal, {
  through: {
    model: FoodPlanMealItem
  },
  foreignKey: 'food_id',
  constraint: true
})

FoodPlanMeal.belongsToMany(Food, {
  through: {
    model: FoodPlanMealItem
  },
  foreignKey: 'food_plan_meal_id',
  constraint: true
})

Nutrient.belongsToMany(Food, {
  through: {
    model: FoodNutrientItem,
  },
  foreignKey: 'nutrient_id',
  constraint: true
})

Food.belongsToMany(Nutrient, {
  through: {
    model: FoodNutrientItem,
  },
  foreignKey: 'food_id',
  constraint: true
})

FoodPlanMealItem.belongsTo(FoodPlanMeal, { foreignKey: 'food_plan_meal_id' })
FoodPlanMealItem.belongsTo(Food, { foreignKey: 'food_id' }) 
FoodPlanMeal.hasMany(FoodPlanMealItem, { foreignKey: 'food_plan_meal_id' })
Food.hasMany(FoodPlanMealItem, { foreignKey: 'food_id' })

FoodNutrientItem.belongsTo(Nutrient, { foreignKey: 'nutrient_id', constraint: true })
FoodNutrientItem.belongsTo(Food, { foreignKey: 'food_id' })
Food.hasMany(FoodNutrientItem, { foreignKey: 'food_id', constraint: true })
Nutrient.hasMany(FoodNutrientItem, { foreignKey: 'nutrient_id' })


const db = {

  // Food Composition tables
  CompositionTable,
  CategoryFood,
  Food,
  FoodNutrientItem,
  Nutrient,

  // User
  UserProfessional,
  UserPatient,
  Anamnesis,
  EnergyExpenditure,
  Anthropometry,
  FoodPlan,
  FoodPlanMeal,
  FoodPlanMealItem,

  // Sequelize
  sequelize
}

module.exports = db