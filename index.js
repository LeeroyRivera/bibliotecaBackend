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

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

//usuarios

app.get('/usuarios', async (req, res) => {
  await controladorUsuarios.getUsuarios(req, res);
});

app.get('/usuarios/:id', async (req, res) => {
  await controladorUsuarios.getUsuariosID(req, res);
});

app.get('/usuarios/:correo/:contra', async (req, res) => {
  await controladorUsuarios.getUsuariosLogin(req, res);
});

app.post('/usuarios', usuarioValidaciones(), async (req, res) => {
  await controladorUsuarios.postUsuarios(req, res);
});

app.put('/usuarios/:id', usuarioValidaciones(), async (req, res) => {
  await controladorUsuarios.putUsuarios(req, res);
});

//libros

app.get('/libros', async (req, res) => {
  await controladorLibros.getLibros(req, res);
});

app.get('/libros-titulo/:titulo', async (req, res) => {
  await controladorLibros.getLibrosTitulo(req, res);
});

app.get('/libros-genero/:genero', async (req, res) => {
  await controladorLibros.getLibrosGenero(req, res);
});

app.post('/libros', libroValidaciones(), async (req, res) => {
  await controladorLibros.postLibros(req, res);
});

app.put('/libros/:id', libroValidaciones(), async (req, res) => {
  await controladorLibros.putLibros(req, res);
});

app.delete('/libros/:id', async (req, res) => {
  await controladorLibros.deleteLibros(req, res);
});

//prestamos

app.get('/prestamos', async (req, res) => {
  await controladorPrestamos.getPrestamos(req, res);
});

app.post('/prestamos', prestamoValidaciones(), async (req, res) => {
  await controladorPrestamos.postPrestamos(req, res);
});

app.put('/prestamos/:id', prestamoValidaciones(), async (req, res) => {
  await controladorPrestamos.putPrestamos(req, res);
});

app.delete('/prestamos/:id', async (req, res) => {
  await controladorPrestamos.deletePrestamos(req, res);
});

/*app.get('/', (req, res) => {
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
});*/

