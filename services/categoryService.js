
const { Category, Book } = require('../models');

async function obtenerTodasLasCategorias() {
    return await Category.findAll({
        include: [
            {
                model: Book,
                attributes: ['id']
            }
        ],
        order: [['id', 'ASC']]
    });
}

async function obtenerCategoriaPorId(id) {
    return await Category.findByPk(id);
}

async function crearCategoria(datos) {
    return await Category.create(datos);
}

async function actualizarCategoria(id, datos) {
    const categoria = await Category.findByPk(id);

    if (!categoria) {
        return null;
    }

    await categoria.update(datos);

    return categoria;
}

async function eliminarCategoria(id) {
    const categoria = await Category.findByPk(id);

    if (!categoria) {
        return false;
    }

    await categoria.destroy();

    return true;
}

module.exports = {
    obtenerTodasLasCategorias,
    obtenerCategoriaPorId,
    crearCategoria,
    actualizarCategoria,
    eliminarCategoria
};
