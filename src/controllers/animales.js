const persona = require('../services/animales');

const listarTodo = async (req, res) => {
    
    try {
        const data = await persona.listarTodo();
        res.status(200).send(data);
    } catch (failure) {
        res.status(failure.status).send(failure.log);
    }
}

const crear = (req, res) => {
    persona.crear(req.body)
    .then(success => res.status(success.status).send(success.log))
    .catch(failure => res.status(failure.status).send(failure.log));
}

module.exports = { listarTodo, crear };