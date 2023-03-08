const persona = require('../services/personas');

const listarTodo = async (req, res) => {
    if (req.session.open)
        try {
            const data = await persona.listarTodo();
            res.status(200).send(data);
        } catch (failure) {
            res.status(failure.status).send(failure.log);
        }
    else
        res.status(401).send("Es necesario autenticarse.")
}

const crear = (req, res) => {
    persona.crear(req.body)
    .then(success => res.status(success.status).send(success.log))
    .catch(failure => res.status(failure.status).send(failure.log));
}

module.exports = { listarTodo, crear };