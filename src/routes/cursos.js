const { Router } = require('express');
const mysqlConnection = require('../config/db');
//const { cursos, facultades } = require('../data');

const router = Router();

router.route('/cursos')
    .get((req, res) => {
        /*
        const cursosFacultad = cursos.map(curso => {
            curso.facultad = facultades.find(facultad => facultad.codigo == curso.codigoFacultad).nombre;
            return curso;
        });
        res.send(cursosFacultad);*/
        mysqlConnection.query("SELECT *FROM CURSO", (err, rows) => {
            if (err) {
                console.error(err);
                res.status(500).send(err);
            } else {
                res.status(200).send(rows);
            }
        })
    })
    .post((req, res) => {
        const { nombre } = req.body;

        if (!nombre) res.status(400).send("Falto el campo curso");
        else {
            const query = mysqlConnection.format("INSERT INTO CURSO(NOMBRE) VALUES (?)", [nombre]);
            mysqlConnection.query(query, (err, rows) => {
                if (err) {
                    console.error(err);
                    res.status(500).send(err);
                } else {
                    res.status(201).send(`Curso "${nombre}" registrado`);
                }
            });
        }

        /*
        if (!codigoFacultad) res.status(400).send("Codigo de facultad de curso no ingresado");

        let nuevoCurso = {
            codigo: cursos.length + 1,
            nombre,
            codigoFacultad
        }

        if (!cursos.some(curso => curso.nombre == nombre) && facultades.some(facultad => facultad.codigo == codigoFacultad)) {
            cursos.push(nuevoCurso);
            res.status(201).send("Curso registrado");
        } else {
            res.status(400).send("Nombre de curso ya existente");
        }*/
        
    });

module.exports = router;