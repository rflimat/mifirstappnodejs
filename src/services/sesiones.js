const mysqlConnection = require('../config/database.connection');

const crea = (correo, contrasenia, keyword) => new Promise((resolve, reject) => {
    let query = mysqlConnection.format("select validarCredenciales(?, ?, ?) as registrado", [correo, contrasenia, keyword]);
    mysqlConnection.query(query, (err, rows) => {
        if (err) {
            console.log(err);
            reject({log: "Error interno del servidor", status: 500});
        } else {
            if (rows[0].registrado == -1)
                reject({log: "Usuario no registrado", status: 404});
            else if (rows[0].registrado == 0)
                reject({log: "Credenciales incorrectas", status: 401});
            else if (rows[0].registrado == 1)
                resolve({log: "Usuario logueado", status: 201});
        }
    });
});

module.exports = { crea };