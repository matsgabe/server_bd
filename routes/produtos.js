const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/produtoController.js');

router.get('/', produtoController.listar);
router.get('/:id', produtoController.buscarPorId);
router.get('/categoria/:categoriaId', produtoController.buscarPorCategoria);
router.post('/', produtoController.criar);
router.put('/:id', produtoController.atualizar);
router.delete('/:id', produtoController.deletar);

module.exports = router;