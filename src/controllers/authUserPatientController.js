const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { v4: uuid } = require('uuid')

const router = express.Router()
const { UserPatient } = require('../models/index')
const userPatientService = require('../services/UserPatient')

const UserPatientService = new userPatientService(UserPatient)

function generateToken(params = {}) {
  return jwt.sign(params, process.env.API_SECRET, {
    expiresIn: '30d',
  })
}

router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password)
      res.status(400).json({ error: "Os campos não foram preenchidos corretamente." })

    const patient = await UserPatientService.findOne({ email: email })

    if (!patient) return res.status(400).json({ error: "Paciente ainda não cadastrado pelo nutricionista." })

    if(patient.password) 
      return res.status(400).json({ error: "Paciente já cadastrado." })

    const hash = await bcrypt.hash(password, 10)

    const data = {
      password: hash
    }

    const patientUpdated = await UserPatientService.update({id: patient.id},data)

    patientUpdated.password = undefined

    return res.json({
      user: patientUpdated,
      token: generateToken({ id: patientUpdated.id })
    })
  }
  catch (error) {
    console.log(error)
    res.status(400).json({ error: "Falha ao registrar usuário." })
  }
})

router.post('/authenticate', async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password)
      res.status(400).json({ error: "Os campos não foram preenchidos corretamente." })

    const user = await UserPatientService.findOne({ email: email })

    if (!user)
      return res.status(401).json({ error: "Usuário e/ou senha inválidos." })

    if (!await bcrypt.compare(password, user.password)) {
      return res.status(401).json({ error: "Usuário ou senha inválidos." })
    }

    user.password = undefined

    return res.json({
      user,
      token: generateToken({ id: user.id })
    });
  } catch (error) {
    console.log(error)
    res.status(400).send({ error: "Falha ao autenticar usuário." })
  }
})

module.exports = router