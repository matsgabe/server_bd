const Sequelize = require("sequelize");
const db = require("../config/database.js");
const sequelize = require("../config/database.js");

const Categoria = db.define("categoria", {
  id_categoria: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nome_categoria: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Categoria;
