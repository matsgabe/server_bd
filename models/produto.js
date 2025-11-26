const Sequelize = require("sequelize");
const db = require("../config/database.js");
const Categoria = require("./categoria.js");

const Produto = db.define("produto", {
  cod_produto: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nome_produto: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  qtde_produto: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

Produto.belongsTo(Categoria, { foreignKey: "id_categoria" });
Categoria.belongsTo(Produto, { foreignKey: "id_categoria" });

module.exports = Produto;
