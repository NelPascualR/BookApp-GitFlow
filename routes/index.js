
const express = require('express');
const router = express.Router();

const HomeController = require('../controllers/HomeController');
const BookController = require('../controllers/BookController');
const CategoryController = require('../controllers/CategoryController');
const AuthorController = require('../controllers/AuthorController');
const PublisherController = require('../controllers/PublisherController');

// Página principal
router.get('/', HomeController.index);

// Administración de libros
router.get('/books/manage', BookController.index);
router.get('/books/create', BookController.create);
router.post('/books', BookController.store);
router.get('/books/:id/edit', BookController.edit);
router.put('/books/:id', BookController.update);
router.delete('/books/:id', BookController.destroy);

// Detalles de libros
router.get('/books/:id', HomeController.detalles);

// Administración de categorías
router.get('/categories', CategoryController.index);
router.get('/categories/create', CategoryController.create);
router.post('/categories', CategoryController.store);
router.get('/categories/:id/edit', CategoryController.edit);
router.put('/categories/:id', CategoryController.update);
router.delete('/categories/:id', CategoryController.destroy);

// Administración de autores
router.get('/authors', AuthorController.index);
router.get('/authors/create', AuthorController.create);
router.post('/authors', AuthorController.store);
router.get('/authors/:id/edit', AuthorController.edit);
router.put('/authors/:id', AuthorController.update);
router.delete('/authors/:id', AuthorController.destroy);

// Administración de editoriales
router.get('/publishers', PublisherController.index);
router.get('/publishers/create', PublisherController.create);
router.post('/publishers', PublisherController.store);
router.get('/publishers/:id/edit', PublisherController.edit);
router.put('/publishers/:id', PublisherController.update);
router.delete('/publishers/:id', PublisherController.destroy);

module.exports = router;
