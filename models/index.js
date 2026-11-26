
const Category = require('./Category');
const Author = require('./Author');
const Publisher = require('./Publisher');
const Book = require('./Book');

// Una categoría puede tener muchos libros.
Category.hasMany(Book, {
    foreignKey: 'categoryId'
});

Book.belongsTo(Category, {
    foreignKey: 'categoryId'
});

// Un autor puede tener muchos libros.
Author.hasMany(Book, {
    foreignKey: 'authorId'
});

Book.belongsTo(Author, {
    foreignKey: 'authorId'
});

// Una editorial puede publicar muchos libros.
Publisher.hasMany(Book, {
    foreignKey: 'publisherId'
});

Book.belongsTo(Publisher, {
    foreignKey: 'publisherId'
});

module.exports = {
    Category,
    Author,
    Publisher,
    Book
};
