
const {
    obtenerTodasLasEditoriales,
    obtenerEditorialPorId,
    crearEditorial,
    actualizarEditorial,
    eliminarEditorial
} = require('../services/publisherService');

const { Book } = require('../models');

async function index(req, res) {
    try {
        const editoriales = await obtenerTodasLasEditoriales();

        res.render('publishers/index', { editoriales });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al consultar las editoriales.');
    }
}

async function create(req, res) {
    res.render('publishers/create');
}

async function store(req, res) {
    try {
        const { name, phone, country } = req.body;

        if (!name?.trim() || !phone?.trim() || !country?.trim()) {
            return res.status(400).send('Todos los campos son obligatorios.');
        }

        await crearEditorial({
            name: name.trim(),
            phone: phone.trim(),
            country: country.trim()
        });

        res.redirect('/publishers');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al crear la editorial.');
    }
}

async function edit(req, res) {
    try {
        const editorial = await obtenerEditorialPorId(req.params.id);

        if (!editorial) {
            return res.status(404).send('Editorial no encontrada.');
        }

        res.render('publishers/edit', { editorial });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al consultar la editorial.');
    }
}

async function update(req, res) {
    try {
        const { name, phone, country } = req.body;

        if (!name?.trim() || !phone?.trim() || !country?.trim()) {
            return res.status(400).send('Todos los campos son obligatorios.');
        }

        const editorial = await actualizarEditorial(req.params.id, {
            name: name.trim(),
            phone: phone.trim(),
            country: country.trim()
        });

        if (!editorial) {
            return res.status(404).send('Editorial no encontrada.');
        }

        res.redirect('/publishers');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al actualizar la editorial.');
    }
}

async function destroy(req, res) {
    try {
        const editorial = await obtenerEditorialPorId(req.params.id);

        if (!editorial) {
            return res.status(404).send('Editorial no encontrada.');
        }

        const librosAsociados = await Book.count({
            where: { publisherId: editorial.id }
        });

        if (librosAsociados > 0) {
            return res.status(400).send(
                'No puedes eliminar esta editorial porque tiene libros asociados.'
            );
        }

        await eliminarEditorial(req.params.id);

        res.redirect('/publishers');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al eliminar la editorial.');
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
