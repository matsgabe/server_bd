const { DataTypes } = require('sequelize');
const sequelize = require('../config/database.js');

const Pedido = sequelize.define('Pedido', {
    num_pedido: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    cod_produto: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    qtde_pedido: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1
        }
    }
}, {
    tableName: 'pedidos',
    timestamps: true
});

module.exports = Pedido;