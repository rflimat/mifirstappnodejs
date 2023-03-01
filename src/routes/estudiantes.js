const { Router } = require('express');
const mysqlConnection = require('../config/db');
const { estudiantes } = require('../data');

const router = Router();

router.route('/estudiantes')
    .get((req, res) => {
        let codigo = req.query.codigo;
        if (!codigo) {
            res.send(estudiantes);
        } else {
            let estudiante = estudiantes.find(estudiante => estudiante.codigo == codigo);
            (!estudiante) ? res.send("Estudiante no existe") : res.send(estudiante);
        }
    })
    .post((req, res) => {
        let { codigo, nombre } = req.body;

        if (!codigo) res.status(400).send("Codigo de estudiante no ingresado");
        if (!nombre) res.status(400).send("Nombre de estudiante no ingresado");

        mysqlConnection.format(
            "INSERT INTO estudiantes (CODIGO, NOMBRE) VALUES(?, ?)",
            codigo,
            nombre,
            (err, rows) => {
                if (err) {
                    console.log(err);
                    res.status(500).send(err);
                } else {
                    res.status(201).send("Estudiante registrado");
                }
            } 
        )

        /*
        let nuevoEstudiante = {
            codigo,
            nombre
        }
        
        if (!estudiantes.some(estudiante => estudiante.codigo == codigo)) {
            estudiantes.push(nuevoEstudiante);
            res.status(201).send("Estudiante registrado");
        } else {
            res.status(201).send("Codigo de estudiante existente");
        }*/
    });

router.route('/estudiantes/:codigo')
    .get((req, res) => {
        let codigo = req.params.codigo;
        let estudiante = estudiantes.find(estudiante => estudiante.codigo == codigo);
        (!estudiante) ? res.send("Estudiante no existe") : res.send(estudiante);
    });

module.exports = router;