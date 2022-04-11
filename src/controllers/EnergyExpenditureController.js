const express = require('express')
const { v4: uuid } = require('uuid')

const router = express.Router()
const { EnergyExpenditure, UserPatient } = require('../models/index')
const energyExpenditureService = require('../services/EnergyExpenditure')
const userPatientService = require('../services/UserPatient')
const authMiddleware = require('../middlewares/auth')

router.use(authMiddleware)

const EnergyExpenditureService = new energyExpenditureService(EnergyExpenditure)
const UserPatientService = new userPatientService(UserPatient)

router.post('/new', async (req, res) => {
  try {

    const {
      description,
      energy_expenditure_date,
      tall,
      weight,
      formula,
      physical_activity_level,
      user_patient_id
    } = req.body

    if (
      !description |
      !energy_expenditure_date |
      !tall |
      !weight |
      !formula |
      !physical_activity_level |
      !user_patient_id) {
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
      energy_expenditure_date,
      tall,
      weight,
      formula,
      physical_activity_level,
      user_patient_id
    }

    const energyExpenditure = await EnergyExpenditureService.add(data)

    return res.json({ energy_expenditure: energyExpenditure })
  }
  catch (error) {
    console.log(error)
    res.status(400).json({ error: "Falha ao registrar gasto energético." })
  }
})

router.delete('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params

    if (!id) {
      res.status(400).json({ error: "Os campos não foram preenchidos corretamente." })
      return
    }

    await EnergyExpenditureService.destroy({ id })

    res.status(204).send()
  } catch (error) {
    res.status(400).json({ error: "Falha ao deletar gasto energético." })
  }
})

router.put('/update/:id', async (req, res) => {
  try {
    const { id } = req.params
    const {
      description,
      energy_expenditure_date,
      tall,
      weight,
      formula,
      physical_activity_level
    } = req.body

    if (!description |
        !energy_expenditure_date |
        !tall |
        !weight |
        !formula |
        !physical_activity_level) {
      res.status(400).json({ error: "Os campos não foram preenchidos corretamente." })
      return
    }

    const data = {
      description,
      energy_expenditure_date,
      tall,
      weight,
      formula,
      physical_activity_level
    }

    const energyExpenditure = await EnergyExpenditureService.update({ id }, data)

    res.status(200).json({ energy_expenditure: energyExpenditure })
  } catch (error) {
    res.status(400).json({ error: "Falha ao atualizar gasto energético." })
  }
})

router.get('/:user_patient_id', async (req, res) => {
  try {
    const { user_patient_id } = req.params

    if (!user_patient_id) {
      res.status(400).json({ error: "Os campos não foram preenchidos corretamente." })
      return
    }

    const energyExpenditures = await EnergyExpenditureService.findAll({ user_patient_id })

    res.status(200).json({ energy_expenditures: energyExpenditures })
  } catch (error) {
    res.status(400).json({ error: "Falha ao pesquisar gasto energético." })
  }
})

module.exports = router