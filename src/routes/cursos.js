const { Router } = require('express');
const controller = require('../controllers/cursos');
const { upload } = require('../config/file.upload.curso');

const router = Router();

router.get('/cursos', controller.listarCursos)
    .post('/cursos', controller.crear)    
    .get('/cursos/:id', controller.listarCurso)
    .post('/cursos/:id/fotos', upload.single('flyer'), controller.nuevaFoto);

module.exports = router;