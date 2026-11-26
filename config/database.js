
const { Sequelize } = require('sequelize');
const path = require('path');

const environment = process.env.NODE_ENV || 'development';

let sequelize;

if (environment === 'development') {
    sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: path.join(__dirname, '..', 'database', 'bookapp.sqlite'),
        logging: false
    });
} else if (environment === 'qa') {
    sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: path.join(__dirname, '..', 'database', 'bookapp-qa.sqlite'),
        logging: false
    });
} else {
    throw new Error(`Entorno no reconocido: ${environment}`);
}

module.exports = sequelize;
