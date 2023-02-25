const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv').config();
const app = express();

const estudiantes = require('./data');

app.use(express.json());
app.use(morgan('dev'));

/*
app.get('/', (req, res) => {
    console.log("Se detecto peticion GET /");
    res.send(`<strong>Hola ${req.query.name}!</strong>`);
});

app.post('/:code', (req, res) => {
    console.log("Se detecto peticion POST /", req.body);
    console.log("Parametros de query", req.query);
    console.log("Parametro de url:", req.params.code);
    res.status(201).send('Codigo registrado');
});
*/

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
    let estudiante = {
        codigo: req.body.codigo,
        nombre: req.body.nombre
    }
    estudiantes.push(estudiante);
    res.status(201).send("Estudiante registrado");
});

app.use((req, res, next) => {
    res.status(404).send("ERROR!")
})

app.set('PORT', process.env.PORT || 3000);

app.listen(app.get('PORT'), () => {
    console.log(`Escuchando en http://127.0.0.1:${app.get('PORT')}`);
});
