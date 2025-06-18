import express from 'express'

const app = express();
const PORT = 3000;

app.use(express.json())

const usuarios = []

app.get('/', (req, res) => {
  res.send('Eduardo!')
})

app.get('/login', (req, res) => {
  res.status(200).json(usuarios)
})

app.post('/login', (req, res) => {
  usuarios.push(req.body)
  res.status(201).json(req.body)
})

app.listen(PORT, () => {
  console.log(`Exemplo de app listado na porta ${PORT}`)
})