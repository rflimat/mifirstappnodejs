const mysql = require('mysql');
const databaseParameters = require('./database.parameters');

const mysqlConnection = mysql.createConnection(databaseParameters);

mysqlConnection.connect(err => {
    if (err) console.error(err);
    else console.log(`Reacción de fusion exitosa - ${process.env.DB_HOST}:${process.env.DB_PORT} ${process.env.DB_DATABASE}`)
});

module.exports = mysqlConnection;