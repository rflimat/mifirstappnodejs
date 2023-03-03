const { Router } = require('express');
const mysqlConnection = require('../config/db');

const router = Router();

router.route('/personas')
    .get((req, res) => {
        mysqlConnection.query("SELECT *FROM PERSONA", (err, rows) => {
            if (err) {
                console.error(err);
                res.status(500).send(err);
            } else {
                res.status(200).send(rows);
            }
        });
    })
    .post((req, res) => {
        const { nombre, apellido1, apellido2, dni, correo, celular } = req.body;

        if (!nombre) res.status(400).send("Falto el campo nombre");
        else if (!apellido1) res.status(400).send("Falto el campo apellido1");
        else if (!apellido2) res.status(400).send("Falto el campo apellido2");
        else if (!dni) res.status(400).send("Falto el campo DNI");
        else if (!correo) res.status(400).send("Falto el campo correo");
        else if (!celular) res.status(400).send("Falto el campo celular");
        else {
            const query = mysqlConnection.format(`INSERT INTO PERSONA (NOMBRE, APELLIDO1, APELLIDO2, DNI, CORREO, CELULAR) VALUES (?, ?, ?, ?, ?, ?)`, [nombre, apellido1, apellido2, dni, correo, celular]);
            mysqlConnection.query(query, (err, rows) => {
                if (err) {
                    console.error(err);
                    res.status(500).send(err);
                } else {
                    res.status(201).send("Persona registrado");
                }
            })
        }

    });

module.exports = router;