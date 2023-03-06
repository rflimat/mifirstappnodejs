const mysqlConnection = require('../config/database.connection');

const listarTodo = () => new Promise ((resolve, reject) => {
    mysqlConnection.query("SELECT *FROM PERSONA", (err, rows) => {
        if (err) {
            console.error(err);
            reject({log: err, status: 500});
        } else {
            resolve(rows);
        }
    });
});

const crear = (persona) => new Promise((resolve, reject) => {
    const { nombre, apellido1, apellido2, dni, correo, celular } = persona;

    if (!nombre) reject({log: "Falto el campo nombre", status: 400});
    else if (!apellido1) reject({log: "Falto el campo apellido1", status: 400});
    else if (!apellido2) reject({log: "Falto el campo apellido2", status: 400});
    else if (!dni) reject({log: "Falto el campo DNI", status: 400});
    else if (!correo) reject({log: "Falto el campo correo", status: 400});
    else if (!celular) reject({log: "Falto el campo celular", status: 400});
    else {
        const query = mysqlConnection.format(`INSERT INTO PERSONA (NOMBRE, APELLIDO1, APELLIDO2, DNI, CORREO, CELULAR) VALUES (?, ?, ?, ?, ?, ?)`, [nombre, apellido1, apellido2, dni, correo, celular]);
        mysqlConnection.query(query, (err, rows) => {
            if (err) {
                console.error(err);
                reject({log: err, status: 500});
            } else {
                resolve({log: "Persona registrado", status: 201});
            }
        })
    }
});

module.exports = { listarTodo, crear };