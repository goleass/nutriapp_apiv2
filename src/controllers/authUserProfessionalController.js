const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { v4: uuid } = require('uuid')

const router = express.Router()
const { UserProfessional } = require('../models/index')
const userProfessionalService = require('../services/UserProfessional')

const UserProfessionalService = new userProfessionalService(UserProfessional)

function generateToken(params = {}) {
  return jwt.sign(params, process.env.API_SECRET, {
    expiresIn: 3600,
  })
}

router.post('/register', async (req, res) => {
  try {
    const { email, password, name } = req.body

    if (!email || !password || !name)
      res.status(400).json({ error: "Os campos não foram preenchidos corretamente." })

    if (await UserProfessionalService.findOne({ email: email }))
      return res.status(400).json({ error: "Usuário já existe." })

    const hash = await bcrypt.hash(password, 10)

    id = uuid();

    const data = {
      id,
      name,
      email,
      password: hash
    }

    const user = await UserProfessionalService.add(data)

    user.password = undefined

    return res.json({
      user,
      token: generateToken({ id: user.id })
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

    const user = await UserProfessionalService.findOne({ email: email })

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