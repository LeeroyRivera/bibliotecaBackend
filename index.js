require('dotenv').config();
const express = require('express');
const db = require('./db');
const app = express();

const controladorUsuarios = require('./controladores/controladorUsuarios');
const controladorLibros = require('./controladores/controladorLibros');
const controladorPrestamos = require('./controladores/controladorPrestamos');

const { usuarioValidaciones } = require('./validaciones/usuarioValidaciones');
const { libroValidaciones } = require('./validaciones/libroValidaciones');
const { prestamoValidaciones } = require('./validaciones/prestamoValidaciones');

const port = process.env.PORT || 3000;

app.use(express.json());

db.sync().then(() => {
  console.log('Base de datos sincronizada');
}).catch((error) => {
  console.log('Error al sincronizar la base de datos: ', error);
});

app.get('/usuarios', async (req, res) => {
  await controladorUsuarios.getUsuarios(req, res);
});

app.post('/usuarios', usuarioValidaciones(), async (req, res) => {
  await controladorUsuarios.postUsuarios(req, res);
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

app.get('/', (req, res) => {
  res.send(`<!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Respuesta HTML</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                margin: 0;
            }
            .container {
                text-align: center;
                padding: 20px;
                background-color: #fff;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                border-radius: 8px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <hÂ1>ÂÂ¡ÂHoÂla, mundo!</h1>
            <p>Este es un ejemplo de respuesta HTML enviada desde el backend.</p>
        </div>
    </body>
    </html>`);
});