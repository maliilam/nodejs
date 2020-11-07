const express = require('express')
const dotenv = require('dotenv')
const db = require('./services/db')
const path = require('path')

dotenv.config({ path: './config/config.env'})
const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

const todos = db.getTodos()

app.listen(
    PORT,
    console.log(`Listening on port ${PORT}`)
)
