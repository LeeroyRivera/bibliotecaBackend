require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: 5432, // Puerto por defecto de PostgreSQL
});

app.get('/usuarios/:id', async (req, res) => {
  try {
      const { id } = req.params;
      const result = await pool.query('SELECT * FROM "usuarios" WHERE "usuariosID" = $1', [id]);
      if (result.rows.length === 0) {
          return res.status(404).json({ error: 'Usuario no encontrado' });
      }
      res.json(result.rows[0]);
  } catch (error) {
      console.error('Error obteniendo usuario:', error);
      res.status(500).json({ error: 'Error obteniendo usuario' });
  }
});

app.get('/libros/:id', async (req, res) => {
  try {
      const { id } = req.params;
      const result = await pool.query('SELECT * FROM "libros" WHERE "librosID" = $1', [id]);
      if (result.rows.length === 0) {
          return res.status(404).json({ error: 'Libro no encontrado' });
      }
      res.json(result.rows[0]);
  } catch (error) {
      console.error('Error obteniendo libro:', error);
      res.status(500).json({ error: 'Error obteniendo libro' });
  }
});

app.get('/prestamos/:id', async (req, res) => {
  try {
      const { id } = req.params;
      const result = await pool.query(`
          SELECT 
              p."prestamosID",
              u."usuariosNombre",
              u."usuariosCorreo",
              l."librosTitulo",
              l."librosGenero",
              p."prestamosFechaInicial",
              p."prestamosFechaDevolucion"
          FROM "prestamos" p
          JOIN "usuarios" u ON p."usuarios_ID" = u."usuariosID"
          JOIN "libros" l ON p."libros_ID" = l."librosID"
          WHERE p."prestamosID" = $1
      `, [id]);

      if (result.rows.length === 0) {
          return res.status(404).json({ error: 'Préstamo no encontrado' });
      }
      res.json(result.rows[0]);
  } catch (error) {
      console.error('Error obteniendo préstamo:', error);
      res.status(500).json({ error: 'Error obteniendo préstamo' });
  }
});

app.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ message: 'Servidor funcionando', time: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/productos/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM "productos" WHERE "id" = $1 RETURNING *', [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    res.json({ message: 'Producto eliminado', deletedProduct: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Put route for libros
app.put('/libros/:id', async (req, res) => {
  const { id } = req.params;
  const { librosTitulo, librosGenero, librosFechaPublicacion } = req.body;

  try {
    const result = await pool.query(
      'UPDATE "libros" SET "librosTitulo" = $1, "librosGenero" = $2, "librosFechaPublicacion" = $3 WHERE "librosID" = $4 RETURNING *',
      [librosTitulo, librosGenero, librosFechaPublicacion, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Libro no encontrado' });
    }

    res.json({ message: 'Libro actualizado', updatedLibro: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Put route for usuarios
app.put('/usuarios/:id', async (req, res) => {
  const { id } = req.params;
  const { usuariosNombre, usuariosCorreo, usuariosTelefono } = req.body;

  try {
    const result = await pool.query(
      'UPDATE "usuarios" SET "usuariosNombre" = $1, "usuariosCorreo" = $2, "usuariosTelefono" = $3 WHERE "usuariosID" = $4 RETURNING *',
      [usuariosNombre, usuariosCorreo, usuariosTelefono, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json({ message: 'Usuario actualizado', updatedUsuario: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Put route for prestamos
app.put('/prestamos/:id', async (req, res) => {
  const { id } = req.params;
  const { libros_ID, usuarios_ID, prestamosFechaInicial, prestamosFechaDevolucion } = req.body;

  try {
    const result = await pool.query(
      'UPDATE "prestamos" SET "libros_ID" = $1, "usuarios_ID" = $2, "prestamosFechaInicial" = $3, "prestamosFechaDevolucion" = $4 WHERE "prestamosID" = $5 RETURNING *',
      [libros_ID, usuarios_ID, prestamosFechaInicial, prestamosFechaDevolucion, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Préstamo no encontrado' });
    }

    res.json({ message: 'Préstamo actualizado', updatedPrestamo: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});