const mysqlConnection = require('../config/database.connection');

const listarTodo = () => new Promise((resolve, reject) => {
    mysqlConnection.query("SELECT *FROM CURSO", (err, rows) => {
        if (err) {
            console.error(err);
            reject({ log: err, status: 500 });
        } else {
            resolve(rows);
        }
    });
});

const crear = (curso) => new Promise((resolve, reject) => {
    const { nombre } = curso;

    if (!nombre) reject({log: "Falto el campo curso", status: 400});
    else {
        const query = mysqlConnection.format("INSERT INTO CURSO(NOMBRE) VALUES (?)", [nombre]);
        mysqlConnection.query(query, (err, rows) => {
            if (err) {
                console.error(err);
                reject({log: err, status: 500});
            } else {
                resolve({log: `Curso "${nombre}" registrado`, status: 201});
            }
        });
    }
});

module.exports = { listarTodo, crear };