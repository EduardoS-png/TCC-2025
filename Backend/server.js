import express from "express";
import bodyParser from "body-parser";
import session from "express-session";
import { usuarios } from "./utils/users.js";
import bcrypt from "bcryptjs";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

export const app = express();
export const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const caminhoPaginas = path.join(__dirname, "../Frontend/src/pages");

app.use(
  cors({
    origin: "http://127.0.0.1:5500",
    credentials: true,
  })
);

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(caminhoPaginas));

app.listen(PORT, () => {
  console.log(`Exemplo de app listado na porta ${PORT}`);
});
