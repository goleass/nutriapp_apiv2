require('dotenv').config()
const express = require('express')
const cors = require('cors')
const controllers = require('./controllers')

const PORT = process.env.PORT || 3000
const app = express()

app.use(cors())
app.use(express.json())
app.use('/', controllers)

app.listen(PORT, () => {
  console.log(`Listen on port ${PORT}`)
})