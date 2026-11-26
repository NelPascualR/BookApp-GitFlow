
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

        // Obtener el texto de búsqueda.
        const busqueda = (req.query.search || '').trim().toLowerCase();

        const categoriasSeleccionadas = req.query.categories || [];

        // Convertir las categorías seleccionadas en un arreglo.
        const seleccionadas = Array.isArray(categoriasSeleccionadas)
            ? categoriasSeleccionadas
            : [categoriasSeleccionadas];

        // Filtrar por título, autor o categoría.
        if (busqueda) {
            libros = libros.filter(libro => {
                const titulo = (libro.title || '').toLowerCase();
                const autor = (libro.Author?.name || '').toLowerCase();
                const categoria = (libro.Category?.name || '').toLowerCase();

                return (
                    titulo.includes(busqueda) ||
                    autor.includes(busqueda) ||
                    categoria.includes(busqueda)
                );
            });
        }

        // Filtrar libros por categorías seleccionadas.
        if (seleccionadas.length > 0) {
            libros = libros.filter(libro =>
                seleccionadas.includes(String(libro.categoryId))
            );
        }

        // Mostrar la página principal.
        res.render('home', {
            libros,
            categorias,
            busqueda: req.query.search || '',
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
