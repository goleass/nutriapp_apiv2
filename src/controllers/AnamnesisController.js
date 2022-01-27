const express = require('express')
const { v4: uuid } = require('uuid')

const router = express.Router()
const { Anamnesis } = require('../models/index')
const anamnesisService = require('../services/Anamnesis')

const AnamnesisService = new anamnesisService(Anamnesis)

router.post('/new', async (req, res) => {
  try {
    console.log(req)

    const {
      clinical_case,
      anamnesis_date,
      life_habits,
      pathologies,
      clinical_evaluation,
      food_habits,
      user_patient_id
    } = req.body

    if (!clinical_case || !anamnesis_date || !user_patient_id) {
      res.status(400).json({ error: "Os campos não foram preenchidos corretamente." })
      return
    }

    id = uuid();

    const data = {
      id,
      clinical_case,
      anamnesis_date,
      life_habits,
      pathologies,
      clinical_evaluation,
      food_habits,
      user_patient_id
    }

    const anamnesis = await AnamnesisService.add(data)

    return res.json({ anamnesis })
  }
  catch (error) {
    console.log(error)
    res.status(400).json({ error: "Falha ao registrar anamnese." })
  }
})

router.get('/', async (req, res) => {
  try {
    const { user_patient_id } = req.query

    if (!user_patient_id) {
      res.status(400).json({ error: "Os campos não foram preenchidos corretamente." })
      return
    }

    const anamnesis = await AnamnesisService.findAll({ user_patient_id })

    res.status(200).json({ anamnesis })
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: "Falha ao pesquisar pacientes." })
  }
})

module.exports = router