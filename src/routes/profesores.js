const { Router } = require('express')
const { profesores } = require('../data');

const router = Router();

router.route('/profesores')
    .get((req, res) => {
        let codigo = req.query.codigo;
        if (!codigo) {
            res.send(profesores);
        } else {
            let profesor = profesores.find(profesor => profesor.codigo == codigo);
            (!profesor) ? res.send("profesor no existe") : res.send(profesor);
        }
    })
    .post((req, res) => {
        let { codigo, nombre } = req.body;

        if (!codigo) res.status(400).send("Codigo de profesor no ingresado");
        if (!nombre) res.status(400).send("Nombre de profesor no ingresado");

        let nuevoProfesor = {
            codigo,
            nombre
        }

        if (!profesores.some(profesor => profesor.codigo == codigo)) {
            profesores.push(nuevoProfesor);
            res.status(201).send("Profesor registrado");
        } else {
            res.status(201).send("Codigo de profesor existente");
        }
    });

router.route('/profesores/:codigo')
    .get((req, res) => {
        let codigo = req.params.codigo;
        let profesor = profesores.find(profesor => profesor.codigo == codigo);
        (!profesor) ? res.send("Profesor no existe") : res.send(profesor);
    });

module.exports = router;