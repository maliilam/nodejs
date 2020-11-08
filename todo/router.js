const express = require('express')
const service = require('./todoService')
const router = express.Router()

const baseUrl = '/api/todos'
const todos = []
let nextId = 100;
router.get(baseUrl, (req, res) => {
    service.getTodos()
        .then(todos => res.json(todos))
})

router.post(baseUrl, (req, res) => {
    const { title, completed } = req.body
    res.json({ id : nextId++, title, completed })
})

router.put(baseUrl + '/:id', (req, res) => {
    const id = req.params.id
    const { title, completed } = req.body
    res.json({ id, title, completed })
})

router.delete(baseUrl + '/:id', (req, res) => {
    const id = req.params.id
    const { title, completed } = req.body
    res.json({ id, title, completed })
})

module.exports = router