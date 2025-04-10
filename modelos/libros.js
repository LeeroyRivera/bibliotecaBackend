const sequelize = require('sequelize');
const db = require('../db');

const Libro = db.define(
    "libros",
    {
        librosID: {
            type: sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        librosTitulo: {
            type: sequelize.STRING,
            allowNull: false,
        },
        librosAutor: {
            type: sequelize.STRING,
            allowNull: false,
        },
        librosGenero: {
            type: sequelize.STRING,
            allowNull: false,
        },
        librosFechaPublicacion: {
            type: sequelize.DATE,
            allowNull: false,
        },
        librosPortada: {
            type: sequelize.STRING,
            allowNull: false,
        },
        librosDescripcion: {
            type: sequelize.STRING,
            allowNull: false,
        },
    },
    {
        timestamps: false // Disable automatic timestamps
    }
);

module.exports = Libro;
