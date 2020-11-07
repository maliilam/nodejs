
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
