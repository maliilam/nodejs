
const { Db } = require('mongodb');
const db = require('./db')

let nextId = 100;

const todos = [
    {
        id: nextId++,
        title: "first todo",
        completed: false
    }
]

//getTodos = () => new Promise(() => todos)

const memoryData = {
    getTodos: () => {
        console.log("mem get todos", todos)
        return Promise.resolve(todos)
    }
}

const dbData = {
    getTodos: db.getTodos
}

module.exports = dbData