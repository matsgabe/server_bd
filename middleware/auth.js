const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '')

    if (!token) {
      return res.status(401).json({ erro: 'Acesso negado. Token não fornecido.'})
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.usuario = decoded
    next()
  } catch (error) {
    res.status(401).json({ erro: 'Token inválido.' })
  }
}

module.exports = auth