const { estudiantes } = require('./data');

const estudiantesAPI = (app) => {
    app.get('/estudiantes', (req, res) => {
        let codigo = req.query.codigo;
        if (!codigo) {
            res.send(estudiantes);
        } else {
            let estudiante = estudiantes.find(estudiante => estudiante.codigo == codigo);
            (!estudiante) ? res.send("Estudiante no existe") : res.send(estudiante);
        }
    });
    
    app.get('/estudiantes/:codigo', (req, res) => {
        let codigo = req.params.codigo;
        let estudiante = estudiantes.find(estudiante => estudiante.codigo == codigo);
        (!estudiante) ? res.send("Estudiante no existe") : res.send(estudiante);
    });
    
    app.post('/estudiantes', (req, res) => {
        if (!req.body.codigo) res.status(400);
        if (!req.body.nombre) res.status(400);
    
        let nuevoEstudiante = {
            codigo: req.body.codigo,
            nombre: req.body.nombre
        }
        
        if (!estudiantes.some(estudiante => estudiante.codigo == nuevoEstudiante.codigo)) {
            estudiantes.push(nuevoEstudiante);
            res.status(201).send("Estudiante registrado");
        } else {
            res.status(201).send("Codigo de estudiante existente");
        }
    });
}

module.exports = estudiantesAPI;