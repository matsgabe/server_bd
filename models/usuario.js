const Sequelize = require("sequelize");
const db = require("../config/database.js");

const Usuario = db.define("usuario", {
  username: Sequelize.STRING,
  password: Sequelize.STRING,
});

module.exports = Usuario;
