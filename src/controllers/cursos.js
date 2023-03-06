const curso = require('../services/cursos');

const listarTodo = async (req, res) => {
    try {
        const data = await curso.listarTodo();
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

module.exports = { listarTodo, crear };