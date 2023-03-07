const animal = require('../services/animales');

const listarTodo = async (req, res) => {
    try {
        const data = await animal.listar(req.query);
        res.status(200).send(data);
    } catch (failure) {
        res.status(failure.status).send(failure.log);
    }
}

const listarPorTipo = async (req, res) => {
    try {
        const data = await animal.listarPorTipo(req.params);
        res.status(200).send(data);
    } catch (failure) {
        res.status(failure.status).send(failure.log);
    }
}

const crear = (req, res) => {
    animal.crear(req.body)
    .then(success => res.status(success.status).send(success.log))
    .catch(failure => res.status(failure.status).send(failure.log));
}

module.exports = { listarTodo, listarPorTipo, crear };