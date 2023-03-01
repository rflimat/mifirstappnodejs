const { animales } = require('../data');

const animalesAPI = (app) => {
    app.get('/animales', (req, res) => {
        let tipo = req.query.tipo;
        let nombre = req.query.nombre;
        if (!tipo) res.send(animales);
        else {
            let animalesTipo = animales.filter(animal => animal.tipo.toLowerCase() == tipo.toLowerCase());
            if (animalesTipo.length <= 0) res.send("Tipo de animal no existente");
            if (!nombre) res.send(animalesTipo);
            else {
                let animal = animalesTipo.find(animal => animal.nombre == nombre);
                (!animal) ? res.send("Animal no existente") : res.send(animal);
            }
        }
    });

    app.get('/animales/:tipo', (req, res) => {
        let tipo = req.params.tipo;
        let animalesTipo = animales.filter(animal => animal.tipo.toLowerCase() == tipo.toLowerCase());
        if (animalesTipo.length <= 0) res.send("Tipo de animal no existente");
        res.send(animalesTipo); 
    });

    app.post('/animales', (req, res) => {
        if (!req.body.nombre) res.status(400).send("Nombre de animal no ingresado");
        if (!req.body.tipo) res.status(400).send("Tipo de animal no ingresado");

        let nuevoAnimal = {
            nombre: req.body.nombre,
            tipo: req.body.tipo
        }

        animales.push(nuevoAnimal);
        res.status(201).send("Animal registrado");
    })
}

module.exports = animalesAPI;
