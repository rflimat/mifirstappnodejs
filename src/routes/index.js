const express = require('express');

const app = express();

app.use(require('./personas'));
app.use(require('./cursos'));

app.use(require('./estudiantes'));
app.use(require('./profesores'));
app.use(require('./animales'));

module.exports = app;