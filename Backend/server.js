import express from 'express'
import bodyParser from 'body-parser'
import session from 'express-session'
import { usuarios } from './utils/users.js'
import bcrypt from 'bcryptjs'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'

const app = express()
const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const caminhoPaginas = path.join(__dirname, '../Frontend/src/pages')

app.use(cors({
  origin: 'http://127.0.0.1:5500',
  credentials: true
}));

app.use(express.json())

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Sessões
app.use(session({
  secret: 'chave_secreta',
  resave: false,
  saveUninitialized: true
}))

app.use(express.static(caminhoPaginas));

app.get('/', (req, res) => {
  if (!req.session.usuario) {
    return res.redirect('/pages/login.html');
  } else {
    res.send(`
    <h2>Bem-vindo, ${req.session.usuario.email}!</h2>
    <a href="/logout">Logout</a>
  `);
  }
})

app.post('/login', (req, res) => {
  const { email, senha } = req.body
  const usuario = usuarios.find(u => u.email === email)
  
  if (usuario && bcrypt.compareSync(senha, usuario.senha)) {
    req.session.usuario = usuario
    return res.status(200).json({ sucesso: true })
  } else {
    return res.status(401).json({ sucesso: false, mensagem: 'Usuário ou senha inválidos'})
  }
})

app.get('/usuario', (req, res) => {
  if (!req.session.usuario) {
    return res.status(401).json({ erro: 'Não autenticado' });
  }
  res.json({ email: req.session.usuario.email });
});

app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login.html')
  })
})

app.listen(PORT, () => {
  console.log(`Exemplo de app listado na porta ${PORT}`)
  console.log(usuarios)
})