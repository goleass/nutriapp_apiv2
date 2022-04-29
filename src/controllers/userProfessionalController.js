const express = require('express')
const jwt = require('jsonwebtoken')

const router = express.Router()

const { UserProfessional } = require('../models/index')
const userProfessionalService = require('../services/UserProfessional')

const authMiddleware = require('../middlewares/auth')

router.use(authMiddleware)

const UserProfessionalService = new userProfessionalService(UserProfessional)

router.get('/me', async (req, res) => {
  try {
    let professional = await UserProfessionalService.findOne({ id: req.user_id })

    professional.password = undefined

    res.status(200).json(professional)
  } catch (error) {
    res.status(400).json({ error: "Falha ao buscar informações pessoais." })
    console.log(error)
  }
})

router.put('/update', async (req, res) => {
  try {
    const {
      name,
      crn
    } = req.body

    if (name === "") {
      res.status(400).json({ error: "Os campos não foram preenchidos corretamente." })
      return
    }

    const data = {
      name,
      crn
    }

    const professional = await UserProfessionalService.update({ id: req.user_id }, data)

    res.status(200).json(professional)
  } catch (error) {
    res.status(400).json({ error: "Falha ao atualizar profissional." })
    console.log(error)
  }
})

module.exports = router