
const {
    obtenerTodosLosLibros,
    obtenerLibroPorId
} = require('../services/bookService');

const {
    obtenerTodasLasCategorias
} = require('../services/categoryService');

async function index(req, res) {
    try {
        let libros = await obtenerTodosLosLibros();

        const categorias = await obtenerTodasLasCategorias();

        // Obtener los datos enviados desde el formulario.
        const busqueda = (req.query.search || '').trim();

        const categoriasSeleccionadas = req.query.categories || [];

        // Convertir las categorías seleccionadas en un arreglo.
        const seleccionadas = Array.isArray(categoriasSeleccionadas)
            ? categoriasSeleccionadas
            : [categoriasSeleccionadas];

        // Filtrar libros por título.
        if (busqueda) {
            libros = libros.filter(libro =>
                libro.title.toLowerCase().includes(busqueda.toLowerCase())
            );
        }

        // Filtrar libros por categorías.
        if (seleccionadas.length > 0) {
            libros = libros.filter(libro =>
                seleccionadas.includes(String(libro.categoryId))
            );
        }

        // Mostrar la página principal.
        res.render('home', {
            libros,
            categorias,
            busqueda,
            categoriasSeleccionadas: seleccionadas
        });

    } catch (error) {
        console.error(error);
        res.status(500).send('Error al mostrar los libros.');
    }
}

async function detalles(req, res) {
    try {
        const libro = await obtenerLibroPorId(req.params.id);

        if (!libro) {
            return res.status(404).send('Libro no encontrado.');
        }

        res.render('books/details', { libro });

    } catch (error) {
        console.error(error);
        res.status(500).send('Error al consultar el libro.');
    }
}

module.exports = {
    index,
    detalles
};
