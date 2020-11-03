const express = require('express')
const path = require('path')
const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

const baseUrl = '/api/todos'
const todos = []
let nextId = 100;
app.get(baseUrl, (req, res) => {
    res.json(todos)
})

app.post(baseUrl, (req, res) => {
    const { title, completed } = req.body
    res.json({ id : nextId++, title, completed })
})

app.put(baseUrl + '/:id', (req, res) => {
    const id = req.params.id
    const { title, completed } = req.body
    res.json({ id, title, completed })
})

app.delete(baseUrl + '/:id', (req, res) => {
    const id = req.params.id
    const { title, completed } = req.body
    res.json({ id, title, completed })
})

app.listen(port, () => console.log(`Listening at http://localhost:${port}`))
