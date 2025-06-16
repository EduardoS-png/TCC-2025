const express = require("express");
const app = express();
const port = 8800

app.get('/', (req, res) => {
  res.send('Eduardo!')
})

app.listen(port, () => {
  console.log(`Exemplo de app listado na porta ${port}`)
})