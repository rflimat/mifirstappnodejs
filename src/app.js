const express = require('express');
const dotenv = require('dotenv').config();
const morgan = require('morgan');
const session = require('express-session');
const sessionParameters = require('./config/session.parameters');
const cors = require('cors');

const app = express();
app.use(cors({origin: 'null'}));
app.use(express.json());
app.use(morgan('dev'));
app.use(session(sessionParameters));
app.use(require('./routes'));

app.use((req, res, next) => {
    res.status(404).send("ERROR!")
})

app.set('PORT', process.env.PORT || 3000);

app.listen(app.get('PORT'), () => {
    console.log(`Escuchando en http://127.0.0.1:${app.get('PORT')}`);
});