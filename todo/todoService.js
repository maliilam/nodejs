
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
        const index = todos.findIndex( td => td.id === todo.id)
        if (index > -1) {
            const update = { ...todos[index], ...todo}
            todos.splice(index, 1, update)   
            return Promise.resolve(update)
        }
        return Promise.resolve({})
    },
    deleteTodo: id => {
        const index = todos.findIndex( td => td.id === id)
        const found = todos[index]
        todos.splice(index, 1)
        return Promise.resolve(found)
    }
}

const dbData = {
    getTodos: db.getTodos
}

module.exports = memoryData