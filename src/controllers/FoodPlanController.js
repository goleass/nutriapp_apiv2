const express = require('express')
const { v4: uuid } = require('uuid')

const router = express.Router()
const { 
  UserPatient, 
  FoodPlan, 
  FoodPlanMeal, 
  FoodPlanMealItem, 
  Food, 
  FoodNutrientItem,
  Nutrient, 
} = require('../models/index')
const foodPlanService = require('../services/FoodPlan')
const userPatientService = require('../services/UserPatient')
const authMiddleware = require('../middlewares/auth')

router.use(authMiddleware)

const FoodPlanService = new foodPlanService(FoodPlan)
const UserPatientService = new userPatientService(UserPatient)

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params

    if (!id) {
      res.status(400).json({ error: "Os campos não foram preenchidos corretamente." })
      return
    }

    const foodPlan = await FoodPlanService.findOne({ id }, [
      {
        model: FoodPlanMeal, 
        include: {
          model: FoodPlanMealItem, 
          include: {
            model: Food,
            include: {
              model: FoodNutrientItem,
              include: Nutrient
            }
          }
        }
      }
    ])

    res.status(200).json({ foodPlan })
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: "Falha ao pesquisar plano alimentar." })
  }
})

router.post('/new', async (req, res) => {
  try {

    const {
      description,
      status,
      references,
      days,
      user_patient_id
    } = req.body

    if (!description || !user_patient_id) {
      res.status(400).json({ error: "Os campos não foram preenchidos corretamente." })
      return
    }

    const patient = await UserPatientService.findOne({ user_professional_id: req.user_id, id: user_patient_id })

    if (!patient) {
      res.status(400).json({ error: "Paciente não encontrado." })
      return
    }

    id = uuid();

    const data = {
      id,
      description,
      status,
      references,
      days,
      user_patient_id
    }

    const foodPlan = await FoodPlanService.add(data)

    return res.json({ foodPlan })
  }
  catch (error) {
    console.log(error)
    res.status(400).json({ error: "Falha ao registrar plano alimentar." })
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

    const foodPlan = await FoodPlanService.update({ id }, data)

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

    await FoodPlanService.destroy({ id })

    res.status(204).send()
  } catch (error) {
    res.status(400).json({ error: "Falha ao deletar plano alimentar." })
  }
})

module.exports = router