const { Pedido, Produto, Categoria, sequelize } = require('../models');
const { Op } = require('sequelize')

exports.listar = async (req, res) => {
    try {
        const pedidos = await Pedido.findAll({
            include: [{
                model: Produto,
                as: 'produto',
                include: [{
                    model: Categoria,
                    as: 'categoria'
                }]
            }]
        });
        res.json(pedidos);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};

exports.buscarPorId = async (req, res) => {
    try {
        const pedido = await Pedido.findByPk(req.params.id, {
            include: [{
                model: Produto,
                as: 'produto',
                include: [{
                    model: Categoria,
                    as: 'categoria'
                }]
            }]
        });

        if (!pedido) {
            return res.status(404).json({ erro: 'Pedido não encontrado.' });
        }

        res.json(pedido);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};

exports.buscarPorQuantidade = async (req, res) => {
    try {
        const { min, max } = req.query;
        
        const where = {};
        if (min) where.qtde_pedido = { ...where.qtde_pedido, [sequelize.Op.gte]: min };
        if (max) where.qtde_pedido = { ...where.qtde_pedido, [sequelize.Op.lte]: max };

        const pedidos = await Pedido.findAll({
            where,
            include: [{
                model: Produto,
                as: 'produto',
                include: [{
                    model: Categoria,
                    as: 'categoria'
                }]
            }]
        });

        res.json(pedidos);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};

exports.deletar = async (req, res) => {
    try {
        const pedido = await Pedido.findByPk(req.params.id);

        if (!pedido) {
            return res.status(404).json({ erro: 'Pedido não encontrado.' });
        }

        await pedido.destroy();
        res.json({ mensagem: 'Pedido deletado com sucesso!' });
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};