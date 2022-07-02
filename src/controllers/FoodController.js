const express = require('express')
const { v4: uuid } = require('uuid')

const router = express.Router()

const { Food, CompositionTable, CategoryFood, Nutrient } = require('../models/index')

const foodService = require('../services/Food')
const nutrientService = require('../services/Nutrient')
const compositionTableService = require('../services/CompositionTable')
const categoryFoodService = require('../services/CategoryFood')

const FoodService = new foodService(Food)
const CompositionTableService = new compositionTableService(CompositionTable)
const CategoryFoodService = new categoryFoodService(CategoryFood)
const NutrientService = new nutrientService(Nutrient)

router.post('/new', async (req, res) => {
  try {
    const { category_food } = req.body
    let { nutrients } = req.body
    const { composition_table } = category_food

    // Verificar se a tabela nutricional não existe, inserir
    let compositionTable = await CompositionTableService.findOne(composition_table)
    if (!compositionTable) {
      console.log("Insere composition table")

      compositionTable = await CompositionTableService.add({
        id: uuid(),
        ...composition_table
      })
    }

    // Verificar se a categoria não existe, inserir
    let categoryFood = await CategoryFoodService.findOne({ description: category_food.description, composition_table_id: compositionTable.id })
    if (!categoryFood) {
      console.log("insere categoria")

      categoryFood = await CategoryFoodService.add({
        id: uuid(),
        description: category_food.description,
        composition_table_id: compositionTable.id
      })
    }

    // Verificar se comida não existe
    let food = await FoodService.findOne({ description: req.body.description, category_food_id: categoryFood.id })
    if (!food) {
      console.log("insere food")

      food = await FoodService.add({
        id: uuid(),
        description: req.body.description,
        base_unit: req.body.base_unit,
        base_qty: req.body.base_qty,
        category_food_id: categoryFood.id
      })
    }

    // Verificar cada um dos nutrientes se não existe, inserir
    if (nutrients) {
      await nutrients.map(async nutrient => {
        const { name } = nutrient
        let n = await NutrientService.findOne({ name })

        if (!n) {
          console.log("Insere nutriente")

          n = await NutrientService.add({
            id: uuid(),
            name: nutrient.name,
            type: nutrient.type,
            unit: nutrient.unit
          })
        }

        await food.addNutrient(n, { through: { id: uuid(), qty: nutrient.qty } })
      })
    }

    return res.send({ Ok: true })
  }
  catch (error) {
    console.log(error)
    res.status(400).send({ error: "Falha ao inserir food." })
  }
})

router.get('/search', async (req, res) => {
  try {
    const { description } = req.query

    const foods = await FoodService.search({ description }, [{model:Nutrient}, {model:CategoryFood, include: CompositionTable}])
    
    return res.json(foods)
  }
  catch (error) {
    console.error(error)
    res.status(400).send({ error: "Falha ao pesquisar comida." })
  }
})

module.exports = router