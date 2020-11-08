const express = require('express')
const service = require('./todoService')
const router = express.Router()

const baseUrl = '/api/todos'
const todos = []
let nextId = 100;
router.get(baseUrl, (req, res) => 
    service.getTodos()
        .then(todos => res.json(todos))
)

router.post(baseUrl, (req, res) => {
    const { title, completed } = req.body
    service.addTodo({ title, completed })
        .then(todo => res.json(todo))
})

router.put(baseUrl + '/:id', (req, res) => {
    const id = req.params.id
    const { title, completed } = req.body
    service.updateTodo({ id, title, completed })
        .then(todo => res.json(todo))
})

router.delete(baseUrl + '/:id', (req, res) => {
    const id = req.params.id
    service.deleteTodo(id)
        .then(todo => res.json(todo))
})

module.exports = router