
const { Db } = require('mongodb');
const db = require('./db')

let nextId = 100;
const todos = [
    {
        id: 99,
        title: "first todo",
        completed: false
    }
]

const memoryData = {
    getTodos: () => {
        console.log("mem get todos", todos)
        return Promise.resolve(todos)
    },
    addTodo: todo => {
        const update = {
            ...todo,
            id: nextId++
        }
        todos.push(update)
        return Promise.resolve(update)
    },
    updateTodo: todo => {
        const index = todos.findIndex( td => todo.id === todo.id)
        todos.splice(index, 1, { ...todos[index], ...todo})
    },
    deleteTodo: todo => todos.splice(
        todos.findIndex( td => todo.id === todo.id),
        1
    )
}

const dbData = {
    getTodos: db.getTodos
}

module.exports = memoryData