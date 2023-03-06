const { Router } = require('express');
const controller = require('../controllers/personas');

const router = Router();

router.route('/personas')
    .get(controller.listarTodo)
    .post(controller.crear);

module.exports = router;