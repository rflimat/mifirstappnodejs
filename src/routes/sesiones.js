const { Router } = require('express');
const router = Router();

const sesion = require('../controllers/sesiones');

router.route('/sesiones')
    .post(sesion.crea)
    .delete(sesion.eliminar);

module.exports = router;