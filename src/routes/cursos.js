const { Router } = require('express');
const controller = require('../controllers/cursos');

const router = Router();

router.route('/cursos')
    .get(controller.listarTodo)
    .post(controller.crear);

module.exports = router;