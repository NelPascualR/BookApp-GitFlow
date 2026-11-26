
require('dotenv').config();

const express = require('express');
const hbs = require('hbs');
const path = require('path');
const methodOverride = require('method-override');
const sequelize = require('./config/database');

const cargarDatosIniciales = require('./services/seedService');
const rutas = require('./routes');

// Helper para comparar valores en las vistas
hbs.registerHelper('eq', function (a, b) {
    return String(a) === String(b);
});

// Helper para comprobar si un arreglo contiene un valor
hbs.registerHelper('includes', function (array, value) {
    if (!Array.isArray(array)) {
        return false;
    }

    return array.includes(String(value));
});

const app = express();

// Configuración de Handlebars
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Archivos públicos
app.use(express.static(path.join(__dirname, 'public')));

// Lectura de formularios
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Permitir PUT y DELETE desde formularios HTML
app.use(methodOverride('_method'));

// Rutas
app.use('/', rutas);

// Iniciar aplicación
async function iniciarServidor() {
    try {
        await sequelize.authenticate();

        console.log('Conexión con la base de datos exitosa.');

        await sequelize.sync();

        console.log('Tablas verificadas correctamente.');

        await cargarDatosIniciales();

        const puerto = process.env.PORT || 3000;

        app.listen(puerto, () => {
            console.log(`BookApp funcionando en http://localhost:${puerto}`);
        });

    } catch (error) {
        console.error('Error al iniciar BookApp:', error);
    }
}

iniciarServidor();
