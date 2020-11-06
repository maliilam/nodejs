const express = require('express')
const path = require('path')
const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

const { MongoClient } = require('mongodb');
// TODO: save connection credential safely

async function main() {
    const uri = "mongodb+srv://mali:malimongoma@cluster0.lkykx.mongodb.net/mongoma?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    try {
        await client.connect();
        await listDatabases(client);
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
    
}
main().catch(console.error);

const listDatabases = async client => {
    const dbList = await client.db().admin().listDatabases();
    dbList.databases.forEach(db => console.log(db.name))
}

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
