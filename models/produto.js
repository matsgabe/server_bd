const { DataTypes } = require('sequelize');
const sequelize = require('../config/database.js');

const Produto = sequelize.define('Produto', {
    cod_produto: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome_produto: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    qtde_produto: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
            min: 0
        }
    },
    id_categoria: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'categorias',
            key: 'id_categoria'
        }
    }
}, {
    tableName: 'produtos',
    timestamps: true
});

module.exports = Produto;