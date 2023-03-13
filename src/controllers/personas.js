const persona = require('../services/personas');

const listarTodo = async (req, res) => {
    if (req.session.open) {
        const {tipo} = req.query;
        if (!tipo) {
            try {
                const data = await persona.listarPersonas();
                res.status(200).send(data);
            } catch (failure) {
                res.status(failure.status).send(failure.log);
            }
        } else {    
            try {
                let data = [];
                if (tipo == 'estudiantes' || tipo == 'estudiante') {
                    data = await persona.listarEstudiantes();
                }
                else if (tipo == 'docentes' || tipo == 'docente') {
                    data = await persona.listarDocentes();
                }
                else if (tipo == 'usuarios' || tipo == 'usuario') {
                    data = await persona.listarUsuarios();
                }
                res.status(200).send(data);
            } catch (failure) {
                res.status(500).send(failure.log);
            }
        }
    } else {
        res.status(401).send("Es necesario autenticarse.");
    }
}

const crear = (req, res) => {
    persona.crear(req.body)
    .then(success => res.status(success.status).send(success.log))
    .catch(failure => res.status(failure.status).send(failure.log));
}

module.exports = { listarTodo, crear };