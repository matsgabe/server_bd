const Sequelize = require("sequelize");

const sequelize = new Sequelize("loja_orm", "root", "123", {
  host: "localhost",
  dialect: "mysql",
  timezone: "-03:00",
});

module.exports = sequelize;
