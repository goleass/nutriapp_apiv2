const express = require('express')
const { v4: uuid } = require('uuid')

const router = express.Router()
const { UserPatient } = require('../models/index')
const userPatientService = require('../services/UserPatient')

const UserPatientService = new userPatientService(UserPatient)

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

    const user = await UserPatientService.add(data)

    return res.json({ user })
  }
  catch (error) {
    console.log(error)
    res.status(400).json({ error: "Falha ao registrar paciente." })
  }
})

router.get('/', async (req, res) => {
  try {
    const { user_professional_id } = req.query

    if (!user_professional_id) {
      res.status(400).json({ error: "Os campos não foram preenchidos corretamente." })
      return
    }

    const users = await UserPatientService.findAll({ user_professional_id })

    console.log(users)

    res.status(200).json({patients:users})
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: "Falha ao pesquisar pacientes." })
  }
})

module.exports = router