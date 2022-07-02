const express = require('express')
const { v4: uuid } = require('uuid')

const router = express.Router()
const { FoodPlanMeal, Food, FoodPlanMealItem, FoodNutrientItem, Nutrient } = require('../models/index')
const foodService = require('../services/Food')
const foodPlanMealService = require('../services/FoodPlanMeal')
const foodPlanMealItemService = require('../services/FoodPlanMealItem')
const authMiddleware = require('../middlewares/auth')

router.use(authMiddleware)

const FoodPlanMealService = new foodPlanMealService(FoodPlanMeal)
const FoodPlanMealItemService = new foodPlanMealItemService(FoodPlanMealItem)
const FoodService = new foodService(Food)

router.get('/', async (req, res) => {
  try {
    const {food_plan_id} = req.query

    if (!food_plan_id) {
      res.status(400).json({ error: "Os campos não foram preenchidos corretamente." })
      return
    }    

    const foodPlanMeals = await FoodPlanMealService.findAll({ food_plan_id }, [
      {
        model: FoodPlanMealItem, 
        include: {
          model: Food,
          include: {
            model: FoodNutrientItem,
            include: Nutrient
          }
        }
      }
    ])
    res.status(200).json({ foodPlanMeals })
  } catch (error) {
    console.error(error)
    res.status(400).json({ error: "Falha ao pesquisar refeição do plano alimentar." })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params

    if (!id) {
      res.status(400).json({ error: "Os campos não foram preenchidos corretamente." })
      return
    }

    const foodPlanMeal = await FoodPlanMealService.findOne({ id }, [
      {
        model: FoodPlanMealItem, 
        include: {
          model: Food,
          include: {
            model: FoodNutrientItem,
            include: Nutrient
          }
        }
      }
    ])

    res.status(200).json({ foodPlanMeal })
  } catch (error) {
    console.error(error)
    res.status(400).json({ error: "Falha ao pesquisar refeição do plano alimentar." })
  }
})

router.post('/new', async (req, res) => {
  try {

    const {
      description,
      meal_time,
      food_plan_id,
      items
    } = req.body

    if (!description || !meal_time || !food_plan_id) {
      res.status(400).json({ error: "Os campos não foram preenchidos corretamente." })
      return
    }

    id = uuid();

    const data = {
      id,
      description,
      meal_time,
      food_plan_id
    }

    const foodPlanMeal = await FoodPlanMealService.add(data)
    
    if(items && items.length > 0) {
      await FoodPlanMealItemService.bulkCreate(
        items.map(({id, qty}) => ({
          id: uuid(),
          food_id: id,
          food_plan_meal_id: foodPlanMeal.id,
          qty
        }))
      )
    }

    return res.json({ foodPlanMeal })
  }
  catch (error) {
    console.log(error)
    res.status(400).json({ error: "Falha ao registrar item no plano alimentar." })
  }
})

router.put('/update/:id', async (req, res) => {
  try {
    const { id } = req.params
    const {
      description,
      references,
      status,
      days
    } = req.body

    if (!id) {
      res.status(400).json({ error: "Os campos não foram preenchidos corretamente." })
      return
    }

    const data = {
      description,
      references,
      status,
      days
    }

    const foodPlan = await FoodPlanMealService.update({ id }, data)

    res.status(200).json({ foodPlan })
  } catch (error) {
    res.status(400).json({ error: "Falha ao atualizar plano alimentar." })
  }
})

router.delete('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params

    if (!id) {
      res.status(400).json({ error: "Os campos não foram preenchidos corretamente." })
      return
    }

    await FoodPlanMealService.destroy({ id })

    res.status(204).send()
  } catch (error) {
    res.status(400).json({ error: "Falha ao deletar item do plano alimentar." })
  }
})

module.exports = router