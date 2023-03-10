const { Router } = require('express');
const controller = require('../controllers/personas');

const router = Router();

router.get('/personas', controller.listarTodo)
    .post('/personas', controller.crear);

module.exports = router;