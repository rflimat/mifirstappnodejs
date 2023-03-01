const { Router } = require('express')
const { cursos, facultades } = require('../data');

const router = Router();

router.route('/cursos')
    .get((req, res) => {
        const cursosFacultad = cursos.map(curso => {
            curso.facultad = facultades.find(facultad => facultad.codigo == curso.codigoFacultad).nombre;
            return curso;
        });
        res.send(cursosFacultad);
    })
    .post((req, res) => {
        let { nombre, codigoFacultad } = req.body;

        if (!nombre) res.status(400).send("Nombre de curso no ingresado");
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
        }
    });

module.exports = router;