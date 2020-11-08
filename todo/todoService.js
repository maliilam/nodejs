
const { Db } = require('mongodb');
const db = require('./db')

let nextId = 100;
const todos = [
    {
        id: '99',
        title:'first todo',
        completed: false
    }
]

const memoryData = {
    getTodos: () => {
        return Promise.resolve(todos)
    },
    addTodo: todo => {
        const update = {
            ...todo,
            id: (nextId++).toString()
        }
        todos.push(update)
        return Promise.resolve(update)
    },
    updateTodo: todo => {
        const index = todos.findIndex( td => td.id === todo.id)
        if (index > -1) {
            const update = { ...todos[index] }
            Object.keys(todo)
                .filter(k => todo[k] !== undefined)
                .forEach(k => update[k] = todo[k])
            todos.splice(index, 1, update)   
            return Promise.resolve(update)
        }
        return Promise.resolve(todo)
    },
    deleteTodo: id => {
        const index = todos.findIndex( td => td.id === id)
        const found = todos[index]
        todos.splice(index, 1)
        return Promise.resolve(found)
    }
}

const dbData = {
    getTodos: db.getTodos,
    addTodo: db.addTodo,
    updateTodo: db.updateTodo
}

module.exports = dbData