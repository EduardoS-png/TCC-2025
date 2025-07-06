import express from 'express'
import session from 'express-session'
import { usuarios } from '../utils/users'

const router = express.Router()

router.use(session({
  secret: 'chave_secreta',
  resave: false,
  saveUninitialized: true
}))

router.get('/', (req, res) => {
  if (!req.session.usuario) {
    return res.redirect('/pages/login.html');
  } else {
    res.send(console.log("Deu certo"));
  }
})

router.post('/login', (req, res) => {
  const { email, senha } = req.body
  const usuario = usuarios.find(u => u.email === email)
  
  if (usuario && bcrypt.compareSync(senha, usuario.senha)) {
    req.session.usuario = usuario
    return res.status(200).json({ sucesso: true })
  } else {
    return res.status(401).json({ sucesso: false, mensagem: 'Usuário ou senha inválidos'})
  }
})
