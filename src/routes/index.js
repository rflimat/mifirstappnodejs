const express = require('express');

const app = express();

app.use(require('./personas'));
app.use(require('./cursos'));
app.use(require('./animales'));
app.use(require('./sesiones'));

module.exports = app;