const Sequelize = require("sequelize");
const db = require("../config/database.js");
const Produto = require("./produto.js");

const Pedido = db.define("pedido", {
  nom_pedido: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  qtde_pedido: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

Pedido.belongsTo(Produto, { foreignKey: "cod_produto" });

module.exports = Pedido;
