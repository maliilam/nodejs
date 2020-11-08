const { MongoClient, ObjectID } = require('mongodb')

let db = null

const initDB = async () => {
    if (db === null || !db.serverConfig.isConnected()) {
        await connectDB()
    }
}

const connectDB = async () => {
    const client = new MongoClient(process.env.MONGO_URI, {
        useNewUrlParser: true, useUnifiedTopology: true 
    })
    await client.connect()
    db = client.db("tododb")
}

const getTodos = async () => {
    try {
        await initDB()
        const todos = await db.collection("todo").find({}).toArray()
        return todos.map(todo => ({ ...todo, id: todo._id }))
    } catch(e) {
        console.error(e)
    }
}

const addTodo = async todo => {
    try {
        await initDB()
        const added = await db.collection("todo").insertOne(todo)
        return { ...added, id: new ObjectID(added._id) }
    } catch(e) {
        console.error(e)
    }
}

const updateTodo = async todo => {
    try {
        await initDB()
        const { id, ...update } = todo
        Object.keys(update).filter(k => update[k] === undefined).forEach(k => delete update[k])
        const updated = await db.collection("todo").updateOne({ _id: new ObjectID(id) }, { $set: update})
        return todo
    } catch (e) {
        console.error(e)
    }
}

module.exports = {
    getTodos: getTodos,
    addTodo: addTodo,
    updateTodo: updateTodo
}
