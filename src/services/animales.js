const { animales } = require('../data');

const listar = (query) => new Promise((response, reject) => {
    const { tipo, nombre } = query;
    if (!tipo) response(animales);
    else {
        let animalesTipo = animales.filter(animal => animal.tipo.toLowerCase() == tipo.toLowerCase());
        if (animalesTipo.length <= 0) reject({ log: "Tipo de animal no existente", status: 404 });
        if (!nombre) response(animalesTipo);
        else {
            let animal = animalesTipo.find(animal => animal.nombre == nombre);
            (!animal) ? reject({ log: "Animal no existente", status: 404 }) : response(animal);
        }
    }
});

const listarPorTipo = (params) => new Promise((response, reject) => {
    const { tipo } = params;
    let animalesTipo = animales.filter(animal => animal.tipo.toLowerCase() == tipo.toLowerCase());
    if (animalesTipo.length <= 0) reject({log: "Tipo de animal no existente", status: 404});
    response(animalesTipo);
});

const crear = (animal) => new Promise((response, reject) => {
    const { nombre, tipo } = animal;
    if (!nombre) reject({ log: "Nombre de animal no ingresado", status: 400 });
    if (!tipo) reject({ log: "Tipo de animal no ingresado", status: 400 });

    let nuevoAnimal = {
        nombre,
        tipo
    }

    animales.push(nuevoAnimal);
    response({ log: "Animal registrado", status: 201 });
});

module.exports = { listar, listarPorTipo, crear };