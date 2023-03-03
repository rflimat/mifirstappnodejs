const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
})

mysqlConnection.connect(err => {
    if (err) console.error(err);
    else console.log(`Reacción de fusion exitosa - ${process.env.DB_HOST}:${process.env.DB_PORT} ${process.env.DB_DATABASE}`)
});

module.exports = mysqlConnection;