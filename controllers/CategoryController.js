
const {
    obtenerTodasLasCategorias,
    obtenerCategoriaPorId,
    crearCategoria,
    actualizarCategoria,
    eliminarCategoria
} = require('../services/categoryService');

const { Book } = require('../models');

async function index(req, res) {
    try {
        const categorias = await obtenerTodasLasCategorias();

        res.render('categories/index', { categorias });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al consultar las categorías.');
    }
}

async function create(req, res) {
    res.render('categories/create');
}

async function store(req, res) {
    try {
        const { name, description } = req.body;

        if (!name?.trim() || !description?.trim()) {
            return res.status(400).send('Todos los campos son obligatorios.');
        }

        await crearCategoria({
            name: name.trim(),
            description: description.trim()
        });

        res.redirect('/categories');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al crear la categoría.');
    }
}

async function edit(req, res) {
    try {
        const categoria = await obtenerCategoriaPorId(req.params.id);

        if (!categoria) {
            return res.status(404).send('Categoría no encontrada.');
        }

        res.render('categories/edit', { categoria });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al consultar la categoría.');
    }
}

async function update(req, res) {
    try {
        const { name, description } = req.body;

        if (!name?.trim() || !description?.trim()) {
            return res.status(400).send('Todos los campos son obligatorios.');
        }

        const categoria = await actualizarCategoria(req.params.id, {
            name: name.trim(),
            description: description.trim()
        });

        if (!categoria) {
            return res.status(404).send('Categoría no encontrada.');
        }

        res.redirect('/categories');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al actualizar la categoría.');
    }
}

async function destroy(req, res) {
    try {
        const categoria = await obtenerCategoriaPorId(req.params.id);

        if (!categoria) {
            return res.status(404).send('Categoría no encontrada.');
        }

        const librosAsociados = await Book.count({
            where: { categoryId: categoria.id }
        });

        if (librosAsociados > 0) {
            return res.status(400).send(
                'No puedes eliminar esta categoría porque tiene libros asociados.'
            );
        }

        await eliminarCategoria(req.params.id);

        res.redirect('/categories');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al eliminar la categoría.');
    }
}

module.exports = {
    index,
    create,
    store,
    edit,
    update,
    destroy
};
