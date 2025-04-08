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
        usuariosContra: {
            type: sequelize.STRING,
            allowNull: false,
        },
        usuariosCreacion: {
            type: sequelize.DATE,
            defaultValue: sequelize.DataTypes.NOW,
            allowNull: false,
        },
        usuariosEstado: {
            type: sequelize.BOOLEAN,
            defaultValue: true,
            allowNull: false,
        },
    },
    {
        timestamps: false // desactiva la fecha de creación y actualización
    }
);

module.exports = Usuario;