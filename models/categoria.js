const { DataTypes } = require('sequelize');
const sequelize = require('../config/database.js');

const Categoria = sequelize.define('Categoria', {
    id_categoria: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome_categoria: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    }
}, {
    tableName: 'categorias',
    timestamps: true
});

module.exports = Categoria;