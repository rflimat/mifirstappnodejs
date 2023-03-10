const { Router } = require('express');
const controller = require('../controllers/animales');

const router = Router();

router.get('/animales', controller.listarTodo)
    .post('/animales', controller.crear)
    .get('/animales/:tipo', controller.listarPorTipo);

module.exports = router;
