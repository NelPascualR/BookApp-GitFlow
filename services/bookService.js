
const { Book, Category, Author, Publisher } = require('../models');

async function obtenerTodosLosLibros() {
    return await Book.findAll({
        include: [Category, Author, Publisher],
        order: [['id', 'ASC']]
    });
}

async function obtenerLibroPorId(id) {
    return await Book.findByPk(id, {
        include: [Category, Author, Publisher]
    });
}

async function crearLibro(datos) {
    return await Book.create(datos);
}

async function actualizarLibro(id, datos) {
    const libro = await Book.findByPk(id);

    if (!libro) {
        return null;
    }

    await libro.update(datos);

    return libro;
}

async function eliminarLibro(id) {
    const libro = await Book.findByPk(id);

    if (!libro) {
        return false;
    }

    await libro.destroy();

    return true;
}

module.exports = {
    obtenerTodosLosLibros,
    obtenerLibroPorId,
    crearLibro,
    actualizarLibro,
    eliminarLibro
};
