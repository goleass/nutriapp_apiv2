const express = require('express')
const { v4: uuid } = require('uuid')

const router = express.Router()
const { Anamnesis, UserPatient } = require('../models/index')
const anamnesisService = require('../services/Anamnesis')
const userPatientService = require('../services/UserPatient')
const authMiddleware = require('../middlewares/auth')

router.use(authMiddleware)

const AnamnesisService = new anamnesisService(Anamnesis)
const UserPatientService = new userPatientService(UserPatient)

router.post('/new', async (req, res) => {
  try {

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

    const patient = await UserPatientService.findOne({ user_professional_id: req.user_id, id: user_patient_id })

    if (!patient) {
      res.status(400).json({ error: "Paciente não encontrado." })
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

router.delete('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params

    if (!id) {
      res.status(400).json({ error: "Os campos não foram preenchidos corretamente." })
      return
    }

    await AnamnesisService.destroy({ id })

    res.status(204).send()
  } catch (error) {
    res.status(400).json({ error: "Falha ao deletar anamnese." })
  }
})

router.put('/update/:id', async (req, res) => {
  try {
    const { id } = req.params
    const {
      clinical_case,
      anamnesis_date,
      life_habits,
      pathologies,
      clinical_evaluation,
      food_habits,
      user_patient_id
    } = req.body

    if (!id || !clinical_case || !anamnesis_date) {
      res.status(400).json({ error: "Os campos não foram preenchidos corretamente." })
      return
    }

    const data = {
      clinical_case,
      anamnesis_date,
      life_habits,
      pathologies,
      clinical_evaluation,
      food_habits,
      user_patient_id
    }

    const anamnesis = await AnamnesisService.update({ id }, data)

    res.status(200).json({ anamnesis })
  } catch (error) {
    res.status(400).json({ error: "Falha ao atualizar anamnese." })
  }
})

router.get('/:user_patient_id', async (req, res) => {
  try {
    const { user_patient_id } = req.params

    if (!user_patient_id) {
      res.status(400).json({ error: "Os campos não foram preenchidos corretamente." })
      return
    }

    const anamnesis = await AnamnesisService.findAll({ user_patient_id })

    res.status(200).json({ anamnesis })
  } catch (error) {
    res.status(400).json({ error: "Falha ao pesquisar anamnese." })
  }
})

module.exports = router