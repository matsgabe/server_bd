const { Produto, Categoria, Pedido, sequelize } = require('../models');

exports.listar = async (req, res) => {
    try {
        const produtos = await Produto.findAll({
            include: [{
                model: Categoria,
                as: 'categoria'
            }]
        });
        res.json(produtos);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};

exports.buscarPorId = async (req, res) => {
    try {
        const produto = await Produto.findByPk(req.params.id, {
            include: [{
                model: Categoria,
                as: 'categoria'
            }]
        });

        if (!produto) {
            return res.status(404).json({ erro: 'Produto não encontrado.' });
        }

        res.json(produto);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};

exports.buscarPorCategoria = async (req, res) => {
    try {
        const produtos = await Produto.findAll({
            where: { id_categoria: req.params.categoriaId },
            include: [{
                model: Categoria,
                as: 'categoria'
            }]
        });

        res.json(produtos);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};

exports.criar = async (req, res) => {
    const transaction = await sequelize.transaction();
    
    try {
        const { nome_produto, qtde_produto, id_categoria } = req.body;

        const categoria = await Categoria.findByPk(id_categoria);
        if (!categoria) {
            await transaction.rollback();
            return res.status(404).json({ erro: 'Categoria não encontrada.' });
        }

        const produto = await Produto.create({
            nome_produto,
            qtde_produto,
            id_categoria
        }, { transaction });

        await this.verificarECriarPedido(produto, transaction);

        await transaction.commit();
        
        const produtoCompleto = await Produto.findByPk(produto.cod_produto, {
            include: [{ model: Categoria, as: 'categoria' }]
        });

        res.status(201).json(produtoCompleto);
    } catch (error) {
        await transaction.rollback();
        res.status(400).json({ erro: error.message });
    }
};

exports.atualizar = async (req, res) => {
    const transaction = await sequelize.transaction();
    
    try {
        const produto = await Produto.findByPk(req.params.id);

        if (!produto) {
            await transaction.rollback();
            return res.status(404).json({ erro: 'Produto não encontrado.' });
        }

        await produto.update(req.body, { transaction });

        await this.verificarECriarPedido(produto, transaction);

        await transaction.commit();
        
        const produtoAtualizado = await Produto.findByPk(produto.cod_produto, {
            include: [{ model: Categoria, as: 'categoria' }]
        });

        res.json(produtoAtualizado);
    } catch (error) {
        await transaction.rollback();
        res.status(400).json({ erro: error.message });
    }
};

exports.deletar = async (req, res) => {
    try {
        const produto = await Produto.findByPk(req.params.id);

        if (!produto) {
            return res.status(404).json({ erro: 'Produto não encontrado.' });
        }

        await produto.destroy();
        res.json({ mensagem: 'Produto deletado com sucesso!' });
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};

exports.verificarECriarPedido = async (produto, transaction) => {
    let qtdePedido = 0;

    if (produto.qtde_produto <= 3) {
        qtdePedido = 4;
    } else if (produto.qtde_produto > 3 && produto.qtde_produto < 7) {
        qtdePedido = 3;
    }

    if (qtdePedido > 0) {
        await Pedido.create({
            cod_produto: produto.cod_produto,
            qtde_pedido: qtdePedido
        }, { transaction });
    }
};