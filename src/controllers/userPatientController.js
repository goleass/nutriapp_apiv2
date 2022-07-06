const express = require('express')
const { v4: uuid } = require('uuid')

const router = express.Router()
const {
  UserPatient,
  Anamnesis,
  EnergyExpenditure,
  Anthropometry,
  FoodPlan,
  FoodPlanMeal,
  FoodPlanMealItem,
  Food
} = require('../models/index')
const userPatientService = require('../services/UserPatient')
const foodPlanService = require('../services/FoodPlan')

const authMiddleware = require('../middlewares/auth')

router.use(authMiddleware)

const UserPatientService = new userPatientService(UserPatient)
const FoodPlanService = new foodPlanService(FoodPlan)

router.post('/new', async (req, res) => {
  try {
    const { name, email, birth_data, gender, user_professional_id } = req.body

    if (!name || !birth_data || !gender || !user_professional_id) {
      res.status(400).json({ error: "Os campos não foram preenchidos corretamente." })
      return
    }

    id = uuid();

    const data = {
      id,
      name,
      email,
      gender,
      birth_data,
      user_professional_id
    }

    const patient = await UserPatientService.add(data)

    return res.json({ patient })
  }
  catch (error) {
    console.log(error)
    res.status(400).json({ error: "Falha ao registrar paciente." })
  }
})

router.get('/me', async (req, res) => {
  try {
    let patient = await UserPatientService.findOne({ id: req.user_id })

    patient.password = undefined

    res.status(200).json(patient)
  } catch (error) {
    res.status(400).json({ error: "Falha ao buscar informações pessoais." })
    console.log(error)
  }
})

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params

    if (!id) {
      res.status(400).json({ error: "Os campos não foram preenchidos corretamente." })
      return
    }

    const patient = await UserPatientService.findOne(
      { id },
      [
        Anamnesis,
        EnergyExpenditure,
        Anthropometry,
        FoodPlan
      ]
    )

    res.status(200).json({ patient })
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: "Falha ao pesquisar paciente." })
  }
})

router.get('/', async (req, res) => {
  try {
    const { user_professional_id } = req.query

    if (!user_professional_id) {
      res.status(400).json({ error: "Os campos não foram preenchidos corretamente." })
      return
    }

    const patients = await UserPatientService.findAll({ user_professional_id }, [Anamnesis])

    res.status(200).json({ patients: patients })
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: "Falha ao pesquisar pacientes." })
  }
})

router.delete('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params

    if (!id) {
      res.status(400).json({ error: "Os campos não foram preenchidos corretamente." })
      return
    }

    await UserPatientService.destroy({ id })

    res.status(204).send()
  } catch (error) {
    res.status(400).json({ error: "Falha ao deletar paciente." })
  }
})

router.put('/update/:id', async (req, res) => {
  try {
    const { id } = req.params
    const {
      name,
      email,
      birth_data,
      gender
    } = req.body

    if (!id || (name === "") || (birth_data === "") || (gender === "")) {
      res.status(400).json({ error: "Os campos não foram preenchidos corretamente." })
      return
    }

    const data = {
      name,
      email,
      birth_data,
      gender
    }

    console.log(data)

    const patient = await UserPatientService.update({ id }, data)

    res.status(200).json({ patient })
  } catch (error) {
    res.status(400).json({ error: "Falha ao atualizar paciente." })
  }
})

router.get('/:user_patient_id/food-plan', async (req, res) => {
  try {
    const { user_patient_id } = req.params
    let queryParams = req.query

    queryParams = {...queryParams, status: true}

    if (!user_patient_id) {
      res.status(400).json({ error: "Os campos não foram preenchidos corretamente." })
      return
    }

    const foodPlans = await FoodPlanService.findAll({ ...queryParams }, [
      {
        model: FoodPlanMeal,
        include: {
          model: FoodPlanMealItem,
          include: Food
        }
      }
    ])

    res.status(200).json({ foodPlans })
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: "Falha ao pesquisar plano alimentar." })
  }
})

module.exports = router