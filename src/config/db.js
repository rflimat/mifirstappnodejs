const mysql = require('mysql');

const mysqlConnection = mysql.createPool({
    host: '127.0.0.1',
    port: 3306,
    database: 'NODE_DB',
    user: 'root',
    password: ''
})

module.exports = mysqlConnection;