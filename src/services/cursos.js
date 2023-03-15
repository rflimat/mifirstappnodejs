const mysqlConnection = require('../config/database.connection');
const fs = require('fs');

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

const nuevaFoto = (idCurso) => new Promise((resolve, reject) => {
    mysqlConnection.query("SELECT existeCurso(?) AS result", idCurso, (err, rows) => {
        if (err) {
            console.log(err.sqlMessage);
            reject({log: "Error interno del servidor", status: 500});
        } else {
            if (rows[0].result == 1) resolve({log: "El archivo se ha guardado con exito", status: 201});
            else fs.unlink(`photos/curso-${idCurso}.png`, err => {
                if (err) {
                    console.log(err);
                    reject({log: "Error interno del servidor", status: 500});
                } else {
                    resolve({log: "El curso especificado no existe", status: 404});
                }
            });
        }
    })
});

module.exports = { listarCursos, listarCurso, filtrarCursosNombre, crear, nuevaFoto };