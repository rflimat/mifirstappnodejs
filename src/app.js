const express = require('express');
const dotenv = require('dotenv').config();
const morgan = require('morgan');

const app = express();
app.use(express.json());
app.use(morgan('dev'));
app.use(require('./routes'));

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

app.use((req, res, next) => {
    res.status(404).send("ERROR!")
})

app.set('PORT', process.env.PORT || 3000);

app.listen(app.get('PORT'), () => {
    console.log(`Escuchando en http://127.0.0.1:${app.get('PORT')}`);
});