const Produto = require("../models/produto.js");
const Pedido = require("../models/pedido.js");
const Categoria = require("../models/categoria.js");
const { Op } = require("sequelize");

module.exports = {
  async store(req, res) {
    try {
      const { nome_produto, qtde_produto, id_categoria } = req.body;

      const produto = await Produto.create({
        nome_produto,
        qtde_produto,
        id_categoria,
      });

      let qtdRequisicao = 0;

      if (qtde_produto <= 3) {
        qtdRequisicao = 4;
      } else if (qtde_produto > 3 && qtde_produto < 7) {
        qtdRequisicao = 3;
      }

      if (qtdRequisicao > 0) {
        await Pedido.create({
          cod_produto: produto.cod_produto,
          qtde_pedido: qtdRequisicao,
        });
        return res.status(201).json({
          msg: "Produto criado e Pedido de reposição gerado!",
          produto,
          reposicao: qtdRequisicao,
        });
      }

      return res.status(201).json({ msg: "Produto criado.", produto });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  async index(req, res) {
    try {
      const { id_categoria, qtde_pedido } = req.query;
      let whereClause = {};
      let includeClause = [{ model: Categoria }];

      if (id_categoria) {
        whereClause.id_categoria = id_categoria;
      }

      if (qtde_pedido) {
        includeClause.push({
          model: Pedido,
          where: { qtde_pedido: qtde_pedido },
          required: true,
        });
      } else {
        includeClause.push({ model: Pedido });
      }

      const produtos = await Produto.findAll({
        where: whereClause,
        include: includeClause,
      });

      return res.json(produtos);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};
