const { animales } = require('../data');

const listar = (query) => {
    let { tipo, nombre } = query;
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
}

const crear = (animal) => {
    const { nombre, tipo }
    if (!req.body.nombre) res.status(400).send("Nombre de animal no ingresado");
    if (!req.body.tipo) res.status(400).send("Tipo de animal no ingresado");

    let nuevoAnimal = {
        nombre: req.body.nombre,
        tipo: req.body.tipo
    }

    animales.push(nuevoAnimal);
    res.status(201).send("Animal registrado");
}