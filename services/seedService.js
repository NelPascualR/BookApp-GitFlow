
const { Category, Author, Publisher, Book } = require('../models');

async function cargarDatosIniciales() {
    const cantidadCategorias = await Category.count();

    if (cantidadCategorias > 0) {
        console.log('Los datos iniciales ya existen.');
        return;
    }

    const categorias = await Category.bulkCreate([
        {
            name: 'Tecnología',
            description: 'Libros sobre informática y tecnología.'
        },
        {
            name: 'Novela',
            description: 'Obras literarias de ficción.'
        },
        {
            name: 'Ciencia',
            description: 'Libros sobre conocimientos científicos.'
        }
    ]);

    const autores = await Author.bulkCreate([
        {
            name: 'Gabriel García Márquez',
            email: 'gabriel@email.com'
        },
        {
            name: 'George Orwell',
            email: 'george@email.com'
        },
        {
            name: 'Stephen Hawking',
            email: 'stephen@email.com'
        }
    ]);

    const editoriales = await Publisher.bulkCreate([
        {
            name: 'Editorial Planeta',
            phone: '8095551234',
            country: 'España'
        },
        {
            name: 'Penguin Random House',
            phone: '8095555678',
            country: 'Estados Unidos'
        },
        {
            name: 'Editorial Crítica',
            phone: '8095559012',
            country: 'España'
        }
    ]);

    await Book.bulkCreate([
        {
            title: 'Cien años de soledad',
            publicationYear: 1967,
            coverUrl: 'https://covers.openlibrary.org/b/isbn/9780307474728-L.jpg',
            categoryId: categorias[1].id,
            authorId: autores[0].id,
            publisherId: editoriales[0].id
        },
        {
            title: '1984',
            publicationYear: 1949,
            coverUrl: 'https://covers.openlibrary.org/b/isbn/9780451524935-L.jpg',
            categoryId: categorias[1].id,
            authorId: autores[1].id,
            publisherId: editoriales[1].id
        },
        {
            title: 'Breve historia del tiempo',
            publicationYear: 1988,
            coverUrl: 'https://covers.openlibrary.org/b/isbn/9780553380163-L.jpg',
            categoryId: categorias[2].id,
            authorId: autores[2].id,
            publisherId: editoriales[2].id
        }
    ]);

    console.log('Datos iniciales cargados correctamente.');
}

module.exports = cargarDatosIniciales;
