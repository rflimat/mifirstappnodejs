const curso = require('../services/cursos');

const listarCursos = async (req, res) => {
    const {nombre} = req.query;

    if (!nombre) {
        try {
            const data = await curso.listarCursos();
            res.status(200).send(data);
        } catch (failure) {
            res.status(failure.status).send(failure.log);
        }
    } else {
        try {
            const data = await curso.filtrarCursosNombre(nombre);
            res.status(200).send(data);
        } catch (failure) {
            res.status(failure.status).send(failure.log);
        }
    }
}

const listarCurso = async (req, res) => {
    const {id} = req.params;
    try {
        const data = await curso.listarCurso(id);
        res.status(200).send(data);
    } catch (failure) {
        res.status(failure.status).send(failure.log);
    }
}

const crear = (req, res) => {
    curso.crear(req.body)
    .then(success => res.status(success.status).send(success.log))
    .catch(failure => res.status(failure.status).send(failure.log));
}

module.exports = { listarCursos, listarCurso, crear };