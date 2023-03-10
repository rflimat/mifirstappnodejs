const mysqlConnection = require('../config/database.connection');

const listarCursos = () => new Promise((resolve, reject) => {
    mysqlConnection.query("CALL listarCursos()", (err, rows) => {
        if (err) {
            console.error(err);
            reject({ log: err, status: 500 });
        } else {
            resolve(rows[0]);
        }
    });
});

const listarCurso = (id) => new Promise((resolve, reject) => {
    mysqlConnection.query(`CALL listarCurso(${id})`, (err, rows) => {
        if (err) {
            console.error(err);
            reject({ log: err, status: 500 });
        } else {
            resolve(rows[0]);
        }
    });
});

const filtrarCursosNombre = (nombre) => new Promise((resolve, reject) => {
    mysqlConnection.query(`CALL filtrarCursosNombre('${nombre}')`, (err, rows) => {
        if (err) {
            console.error(err);
            reject({ log: err, status: 500 });
        } else {
            resolve(rows[0]);
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

module.exports = { listarCursos, listarCurso, filtrarCursosNombre, crear };