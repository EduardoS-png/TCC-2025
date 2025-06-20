import bcrypt from 'bcryptjs'

// Simula usuários
export const usuarios = [
  { id: 1, 
    nome: "Izidoro Júnior",
    email: "admin@gmail.com", 
    senha: bcrypt.hashSync("1234", 10) }
];