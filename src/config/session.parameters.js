const MySQLStore = require('express-mysql-session');
const databaseParameters = require('./database.parameters');
const sessionStore = new MySQLStore(databaseParameters);

module.exports = {
    secret: process.env.SESSION_HASH,
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
        maxAge: 180000
    }
}