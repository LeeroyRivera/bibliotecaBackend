require('dotenv').config();
const express = require('express');
const db = require('./db')
const app = express();
const modeloUsuario = require('./modelos/usuarios');
const port = process.env.PORT || 3000;

db.sync().then(() => {
  console.log('Base de datos sincronizada');
  
  //raw: true envia objetos planos en lugar de instancias de Sequelize
  modeloUsuario.findAll({ raw: true }).then((usuarios) => {
    console.log('Usuarios: ', usuarios);
  }).catch((err) => {
    console.error('Error en obtener usuarios: ', err.message);
  });

}).catch((err) => {
  console.error('Error en sincronizar a base de datos: ', err.message);
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
