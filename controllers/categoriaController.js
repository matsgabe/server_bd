const { Categoria, Produto } = require('../models');

exports.listar = async (req, res) => {
    try {
        const categorias = await Categoria.findAll({
            include: [{
                model: Produto,
                as: 'produtos'
            }]
        });
        res.json(categorias);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};

exports.buscarPorId = async (req, res) => {
    try {
        const categoria = await Categoria.findByPk(req.params.id, {
            include: [{
                model: Produto,
                as: 'produtos'
            }]
        });

        if (!categoria) {
            return res.status(404).json({ erro: 'Categoria não encontrada.' });
        }

        res.json(categoria);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};

exports.criar = async (req, res) => {
    try {
        const categoria = await Categoria.create(req.body);
        res.status(201).json(categoria);
    } catch (error) {
        res.status(400).json({ erro: error.message });
    }
};

exports.atualizar = async (req, res) => {
    try {
        const categoria = await Categoria.findByPk(req.params.id);

        if (!categoria) {
            return res.status(404).json({ erro: 'Categoria não encontrada.' });
        }

        await categoria.update(req.body);
        res.json(categoria);
    } catch (error) {
        res.status(400).json({ erro: error.message });
    }
};

exports.deletar = async (req, res) => {
    try {
        const categoria = await Categoria.findByPk(req.params.id);

        if (!categoria) {
            return res.status(404).json({ erro: 'Categoria não encontrada.' });
        }

        await categoria.destroy();
        res.json({ mensagem: 'Categoria deletada com sucesso!' });
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};