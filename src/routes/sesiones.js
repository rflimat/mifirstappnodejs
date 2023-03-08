const { Router } = require('express');
const router = Router();

const sesion = require('../controllers/sesiones');

router.route('/sesiones')
    .post(sesion.crea)

module.exports = router;