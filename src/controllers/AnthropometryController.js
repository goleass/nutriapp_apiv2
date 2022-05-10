const express = require('express')
const { v4: uuid } = require('uuid')

const router = express.Router()
const { Anthropometry, UserPatient } = require('../models/index')
const anthropometryService = require('../services/Anthropometry')
const userPatientService = require('../services/UserPatient')
const authMiddleware = require('../middlewares/auth')

router.use(authMiddleware)

const AnthropometryService = new anthropometryService(Anthropometry)
const UserPatientService = new userPatientService(UserPatient)

router.post('/new', async (req, res) => {
  try {

    const {
      description,
      anthropometry_date,
      tall,
      weight,
      circumferences,
      bone_diameters,
      body_composition,
      user_patient_id
    } = req.body

    if (
      !description |
      !anthropometry_date |
      !tall |
      !weight |
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
      anthropometry_date,
      tall,
      weight,
      circumferences,
      bone_diameters,
      body_composition,
      user_patient_id
    }

    const anthropometry = await AnthropometryService.add(data)

    return res.json({ anthropometry })
  }
  catch (error) {
    console.log(error)
    res.status(400).json({ error: "Falha ao registrar avaliação antropométrica." })
  }
})

router.delete('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params

    if (!id) {
      res.status(400).json({ error: "Os campos não foram preenchidos corretamente." })
      return
    }

    await AnthropometryService.destroy({ id })

    res.status(204).send()
  } catch (error) {
    res.status(400).json({ error: "Falha ao deletar avaliação antropométrica." })
  }
})

module.exports = router