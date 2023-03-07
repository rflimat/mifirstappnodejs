const { Router } = require('express');
const controller = require('../controllers/animales');

const router = Router();

router.route('/animales')
    .get(controller.listarTodo)
    .post(controller.crear);

router.route('/animales/:tipo')
    .get(controller.listarPorTipo);

module.exports = router;
