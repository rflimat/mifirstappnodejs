const { Router } = require('express')
const { facultades } = require('../data');

const router = Router();

router.route('/facultades')
    .get((req, res) => {
        res.send(facultades);
    })
    .post((req, res) => {
        let { nombre } = req.body;

        if (!nombre) res.status(400).send("Nombre de facultad no ingresado");

        let nuevoFacultad = {
            codigo: facultades.length + 1,
            nombre
        }

        if (!facultades.some(facultad => facultad.nombre == nombre)) {
            facultades.push(nuevoFacultad);
            res.status(201).send("Facultad registrado");
        } else {
            res.status(400).send("Nombre de facultad ya existente");
        }
    });

module.exports = router;