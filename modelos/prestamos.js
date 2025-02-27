const sequelize = require('sequelize');
const db = require('../db');
const Libro = require('./libros');
const Usuario = require('./usuarios');

const Prestamo = db.define(
    "prestamos",
    {
        prestamosID: {
            type: sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        libros_ID: {
            type: sequelize.INTEGER,
            allowNull: false,
            references: {
                model: Libro,
                key: 'librosID'
            }
        },
        usuarios_ID: {
            type: sequelize.INTEGER,
            allowNull: false,
            references: {
                model: Usuario,
                key: 'usuariosID'
            }
        },
        prestamosFechaInicial: {
            type: sequelize.DATE,
            allowNull: false,
        },
        prestamosFechaDevolucion: {
            type: sequelize.DATE,
            allowNull: false,
        },
    },
    {
        timestamps: false // Disable automatic timestamps
    }
);

module.exports = Prestamo;
