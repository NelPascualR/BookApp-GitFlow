
const { Author, Book } = require('../models');

async function obtenerTodosLosAutores() {
    return await Author.findAll({
        include: [
            {
                model: Book,
                attributes: ['id']
            }
        ],
        order: [['id', 'ASC']]
    });
}

async function obtenerAutorPorId(id) {
    return await Author.findByPk(id);
}

async function crearAutor(datos) {
    return await Author.create(datos);
}

async function actualizarAutor(id, datos) {
    const autor = await Author.findByPk(id);

    if (!autor) {
        return null;
    }

    await autor.update(datos);

    return autor;
}

async function eliminarAutor(id) {
    const autor = await Author.findByPk(id);

    if (!autor) {
        return false;
    }

    await autor.destroy();

    return true;
}

module.exports = {
    obtenerTodosLosAutores,
    obtenerAutorPorId,
    crearAutor,
    actualizarAutor,
    eliminarAutor
};
