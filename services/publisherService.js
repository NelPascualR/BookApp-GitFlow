
const { Publisher, Book } = require('../models');

async function obtenerTodasLasEditoriales() {
    return await Publisher.findAll({
        include: [
            {
                model: Book,
                attributes: ['id']
            }
        ],
        order: [['id', 'ASC']]
    });
}

async function obtenerEditorialPorId(id) {
    return await Publisher.findByPk(id);
}

async function crearEditorial(datos) {
    return await Publisher.create(datos);
}

async function actualizarEditorial(id, datos) {
    const editorial = await Publisher.findByPk(id);

    if (!editorial) {
        return null;
    }

    await editorial.update(datos);

    return editorial;
}

async function eliminarEditorial(id) {
    const editorial = await Publisher.findByPk(id);

    if (!editorial) {
        return false;
    }

    await editorial.destroy();

    return true;
}

module.exports = {
    obtenerTodasLasEditoriales,
    obtenerEditorialPorId,
    crearEditorial,
    actualizarEditorial,
    eliminarEditorial
};
