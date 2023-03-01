const express = require('express');

const app = express();

app.use(require('./estudiantes'));
app.use(require('./profesores'));
app.use(require('./cursos'));
app.use(require('./facultades'));

module.exports = app;