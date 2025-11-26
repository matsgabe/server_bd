const Usuario = require("../models/usuario");
const jwt = require("jsonwebtoken");
const SECRET = "serverBddEng123";

module.exports = {
  async login(req, res) {
    const { username, password } = req.body;
    const user = await Usuario.findOne({ where: { username, password } });

    if (!user)
      return res.status(400).json({ error: "Usuário ou senha inválidos" });

    const token = jwt.sign({ id: user.id }, SECRET, { expiresIn: "1h" });
    return res.json({ auth: true, token });
  },
};
