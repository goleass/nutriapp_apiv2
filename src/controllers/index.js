const express = require('express')
const router = express.Router()

const auth = require('./authUserProfessionalController')
const anamnesisController = require('./AnamnesisController')
const foodPlanController = require('./FoodPlanController')
const foodPlanMealController = require('./FoodPlanMealController')
const energyExpenditureController = require('./EnergyExpenditureController')
const anthropometryController = require('./AnthropometryController')
const userPatientController = require('./userPatientController')
const userProfessionalController = require('./userProfessionalController')

// const user = require('./userController')
// const compositionTable = require('./foodNutrient/compositionTable')
// const categoryFood = require('./foodNutrient/categoryFood')
// const foods = require('./foodNutrient/food')
const food = require('./FoodController')

router.get('/', (req, res) => {
  res.send('ok')
})

router.use('/auth-professional', auth)
router.use('/professional', userProfessionalController)
router.use('/anamnesis', anamnesisController)
router.use('/energy-expenditure', energyExpenditureController)
router.use('/anthropometry', anthropometryController)
router.use('/food-plan', foodPlanController)
router.use('/food-plan-meal', foodPlanMealController)
router.use('/patient', userPatientController)
// router.use('/user', user)
// router.use('/composition-table', compositionTable)
// router.use('/category-food', categoryFood)
router.use('/food', food)
// router.use('/foods', foods)

module.exports = router