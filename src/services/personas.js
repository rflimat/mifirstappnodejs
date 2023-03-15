const mysqlConnection = require('../config/database.connection');
const transporter = require('../config/mailer.connection');

const listarPersonas = () => new Promise ((resolve, reject) => {
    mysqlConnection.query("CALL listarPersonas()", (err, rows) => {
        if (err) {
            console.error(err);
            reject({log: err, status: 500});
        } else {
            resolve(rows[0]);
        }
    });
});

const listarEstudiantes = () => new Promise ((resolve, reject) => {
    mysqlConnection.query("CALL listarEstudiantes()", (err, rows) => {
        if (err) {
            console.error(err);
            reject({log: err, status: 500});
        } else {
            resolve(rows[0]);
        }
    });
});

const listarDocentes = () => new Promise ((resolve, reject) => {
    mysqlConnection.query("CALL listarDocentes()", (err, rows) => {
        if (err) {
            console.error(err);
            reject({log: err, status: 500});
        } else {
            resolve(rows[0]);
        }
    });
});

const listarUsuarios = () => new Promise ((resolve, reject) => {
    mysqlConnection.query("CALL listarUsuarios()", (err, rows) => {
        if (err) {
            console.error(err);
            reject({log: err, status: 500});
        } else {
            resolve(rows[0]);
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
        const query = mysqlConnection.format(`SELECT registrarPersona(?, ?, ?, ?, ?, ?) AS estado`, [nombre, apellido1, apellido2, dni, correo, celular]);
        mysqlConnection.query(query, (err, rows) => {
            if (err) {
                console.error(err);
                reject({log: err, status: 500});
            } else {
                if (rows[0].estado == 0) {
                    reject({log: "DNI o correo de persona ya existente", status: 404});
                } else {
                    transporter.sendMail({
                        from: process.env.MAIL_USER,
                        to: correo,
                        subject: "Se registro en schoolXD",
                        text: `Usted ${nombre} ${apellido1} ${apellido2}, logro registrarse en schoolXD`,
                        html: `<p>Usted ${nombre} ${apellido1} ${apellido2}, logro registrarse en schoolXD</p>`,
                    });
                    
                    resolve({log: "Persona registrado", status: 201});
                }
            }
        })
    }
});

module.exports = { listarPersonas, listarEstudiantes, listarDocentes, listarUsuarios, crear };