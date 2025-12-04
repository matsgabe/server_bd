const sequelize = require('../config/database.js');
const Categoria = require('./categoria.js');
const Produto = require('./produto.js');
const Pedido = require('./pedido.js');
const Usuario = require('./usuario.js');

Categoria.hasMany(Produto, {
    foreignKey: 'id_categoria',
    as: 'produtos'
});

Produto.belongsTo(Categoria, {
    foreignKey: 'id_categoria',
    as: 'categoria'
});

Produto.hasMany(Pedido, {
    foreignKey: 'cod_produto',
    as: 'pedidos'
});

Pedido.belongsTo(Produto, {
    foreignKey: 'cod_produto',
    as: 'produto'
});

module.exports = {
    sequelize,
    Categoria,
    Produto,
    Pedido,
    Usuario
};