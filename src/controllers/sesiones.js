const sesion = require('../services/sesiones');

const crea = (req, res) => {
    const { correo, contrasenia } = req.body;
    if (!req.session.open) {
        sesion.crea(correo, contrasenia)
        .then((success) => {
            req.session.open = true;
            res.status(success.status).send(success.log);
        })
        .catch((failure) => {
            res.status(failure.status).send(failure.log);
        })
    } else {
        res.status(409).send("Sesión ya existente.");
    }
}

module.exports = { crea };