const { Router } = require('express');
const controller = require('../controllers/animales');

const router = Router();

router.route('/animales')
    .get()
    .post((req, res) => {
        
    });

router.route('/animales/:tipo')
    .get((req, res) => {
        let tipo = req.params.tipo;
        let animalesTipo = animales.filter(animal => animal.tipo.toLowerCase() == tipo.toLowerCase());
        if (animalesTipo.length <= 0) res.send("Tipo de animal no existente");
        res.send(animalesTipo); 
    });

module.exports = router;
