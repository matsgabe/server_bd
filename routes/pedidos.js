const express = require('express');
const router = express.Router();
const pedidoController = require('../controllers/pedidoController.js');

router.get('/', pedidoController.listar);
router.get('/:id', pedidoController.buscarPorId);
router.get('/quantidade/filtro', pedidoController.buscarPorQuantidade);
router.delete('/:id', pedidoController.deletar);

module.exports = router;