
const {
    obtenerTodosLosAutores,
    obtenerAutorPorId,
    crearAutor,
    actualizarAutor,
    eliminarAutor
} = require('../services/authorService');

const { Book } = require('../models');

function correoValido(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function index(req, res) {
    try {
        const autores = await obtenerTodosLosAutores();

        res.render('authors/index', { autores });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al consultar los autores.');
    }
}

async function create(req, res) {
    res.render('authors/create');
}

async function store(req, res) {
    try {
        const { name, email } = req.body;

        if (!name?.trim() || !email?.trim()) {
            return res.status(400).send('Todos los campos son obligatorios.');
        }

        if (!correoValido(email.trim())) {
            return res.status(400).send('Introduce un correo electrónico válido.');
        }

        await crearAutor({
            name: name.trim(),
            email: email.trim()
        });

        res.redirect('/authors');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al crear el autor.');
    }
}

async function edit(req, res) {
    try {
        const autor = await obtenerAutorPorId(req.params.id);

        if (!autor) {
            return res.status(404).send('Autor no encontrado.');
        }

        res.render('authors/edit', { autor });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al consultar el autor.');
    }
}

async function update(req, res) {
    try {
        const { name, email } = req.body;

        if (!name?.trim() || !email?.trim()) {
            return res.status(400).send('Todos los campos son obligatorios.');
        }

        if (!correoValido(email.trim())) {
            return res.status(400).send('Introduce un correo electrónico válido.');
        }

        const autor = await actualizarAutor(req.params.id, {
            name: name.trim(),
            email: email.trim()
        });

        if (!autor) {
            return res.status(404).send('Autor no encontrado.');
        }

        res.redirect('/authors');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al actualizar el autor.');
    }
}

async function destroy(req, res) {
    try {
        const autor = await obtenerAutorPorId(req.params.id);

        if (!autor) {
            return res.status(404).send('Autor no encontrado.');
        }

        const librosAsociados = await Book.count({
            where: { authorId: autor.id }
        });

        if (librosAsociados > 0) {
            return res.status(400).send(
                'No puedes eliminar este autor porque tiene libros asociados.'
            );
        }

        await eliminarAutor(req.params.id);

        res.redirect('/authors');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al eliminar el autor.');
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
