const sequelize = require('sequelize');
const db = require('../db');

const Usuario = db.define(
    "usuarios",
    {
        usuariosID: {
            type: sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        usuariosNombre: {
            type: sequelize.STRING,
            allowNull: false,
        },
        usuariosCorreo: {
            type: sequelize.STRING,
            allowNull: false,
        },
        usuariosTelefono: {
            type: sequelize.STRING,
            allowNull: false,
        },
    },
    {
        timestamps: false // desactiva la fecha de creación y actualización
    }
);

module.exports = Usuario;