
const {
    obtenerTodosLosLibros,
    obtenerLibroPorId,
    crearLibro,
    actualizarLibro,
    eliminarLibro
} = require('../services/bookService');

const { Category, Author, Publisher } = require('../models');

async function index(req, res) {
    try {
        const libros = await obtenerTodosLosLibros();

        res.render('books/index', {
            libros,
            totalLibros: libros.length
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al consultar los libros.');
    }
}

async function create(req, res) {
    try {
        const categorias = await Category.findAll();
        const autores = await Author.findAll();
        const editoriales = await Publisher.findAll();

        if (!categorias.length || !autores.length || !editoriales.length) {
            return res.status(400).send(
                'No se puede crear un libro. Debes registrar categorias, autores y editoriales primero.'
            );
        }

        res.render('books/create', {
            categorias,
            autores,
            editoriales
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al preparar el formulario.');
    }
}

async function store(req, res) {
    try {
        const {
            title,
            publicationYear,
            coverUrl,
            categoryId,
            authorId,
            publisherId
        } = req.body;

        if (!title || !title.trim() || !publicationYear ||
            !coverUrl || !categoryId || !authorId || !publisherId) {
            return res.status(400).send(
                'Completa todos los campos obligatorios.'
            );
        }

        const anio = Number(publicationYear);

        if (!Number.isInteger(anio) || anio <= 0) {
            return res.status(400).send(
                'El año de publicacion debe ser un numero entero positivo.'
            );
        }

        await crearLibro({
            title: title.trim(),
            publicationYear: anio,
            coverUrl,
            categoryId,
            authorId,
            publisherId
        });

        res.redirect('/books/manage');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al registrar el libro.');
    }
}

async function edit(req, res) {
    try {
        const libro = await obtenerLibroPorId(req.params.id);

        if (!libro) {
            return res.status(404).send('Libro no encontrado.');
        }

        const categorias = await Category.findAll();
        const autores = await Author.findAll();
        const editoriales = await Publisher.findAll();

        res.render('books/edit', {
            libro,
            categorias,
            autores,
            editoriales
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al preparar la edicion.');
    }
}

async function update(req, res) {
    try {
        const {
            title,
            publicationYear,
            coverUrl,
            categoryId,
            authorId,
            publisherId
        } = req.body;

        if (!title || !title.trim() || !publicationYear ||
            !categoryId || !authorId || !publisherId) {
            return res.status(400).send(
                'Completa todos los campos obligatorios.'
            );
        }

        const anio = Number(publicationYear);

        if (!Number.isInteger(anio) || anio <= 0) {
            return res.status(400).send(
                'El año de publicacion debe ser un numero entero positivo.'
            );
        }

        const libroExistente = await obtenerLibroPorId(req.params.id);

        if (!libroExistente) {
            return res.status(404).send('Libro no encontrado.');
        }

        await actualizarLibro(req.params.id, {
            title: title.trim(),
            publicationYear: anio,
            coverUrl: coverUrl || libroExistente.coverUrl,
            categoryId,
            authorId,
            publisherId
        });

        res.redirect('/books/manage');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al actualizar el libro.');
    }
}

async function destroy(req, res) {
    try {
        const eliminado = await eliminarLibro(req.params.id);

        if (!eliminado) {
            return res.status(404).send('Libro no encontrado.');
        }

        res.redirect('/books/manage');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al eliminar el libro.');
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
