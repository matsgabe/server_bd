const express = require("express");
const db = require("./config/database.js");
const app = express();

app.use(express.json());

const ProdutoController = require("./controllers/produtoController.js");
const AuthController = require("./controllers/authControllers.js");
const Categoria = require("./models/categoria.js");
const Usuario = require("./models/usuario.js");
const authMiddleware = require("./middlewares/auth.js");

app.post("/login", AuthController.login);

app.post("/produtos", authMiddleware, ProdutoController.store);
app.get("/produtos", authMiddleware, ProdutoController.index);

app.post("/categorias", async (req, res) => {
  const cat = await Categoria.create(req.body);
  res.json(cat);
});
app.post("/usuarios", async (req, res) => {
  const user = await Usuario.create(req.body);
  res.json(user);
});

db.sync({ force: false })
  .then(() => {
    console.log("Banco de dados conectado e sincronizado via ORM");
    app.listen(3000, () => {
      console.log("Servidor rodando na porta 3000");
    });
  })
  .catch((err) => console.log("Erro ao conectar: " + err));
