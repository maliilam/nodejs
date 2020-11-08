const { MongoClient } = require('mongodb')

let db = null

const getDB = async () => {
    if (db === null || !db.serverConfig.isConnected()) {
        await connectDB()
    }
    return db
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
        await connectDB()
        return await db.collection("todo").find({}).toArray()
        
        //return getDB().collection("todo").find({}).toArray()
    } catch(e) {
        console.error(e)
    }    
}

module.exports = {
    getTodos: getTodos
}
