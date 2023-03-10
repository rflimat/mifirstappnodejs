const { Router } = require('express');
const controller = require('../controllers/cursos');

const router = Router();

router.get('/cursos', controller.listarCursos)
    .post('/cursos', controller.crear)    
    .get('/cursos/:id', controller.listarCurso);

module.exports = router;