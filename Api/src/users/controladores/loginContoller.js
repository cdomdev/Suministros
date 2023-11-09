const express = require('express');
const router = express.Router();
const conexion = require('../../database/conecction');
const bcrypt = require('bcrypt');
const security = require('./security'); // Asegúrate de que la ubicación del archivo de seguridad sea correcta

const loginController = async (req, res) => {
  const username = req.body.email;
  const password = req.body.password;

  const query = 'SELECT id, password FROM usuarios WHERE usuario = ?'; // Cambié "usuarios" a "usuario" para que coincida con la columna de la base de datos
  const values = [username];

  conexion.connection.query(query, values, async (error, results) => {
    if (error) {
      return res.status(500).json({ error: 'Error en la base de datos' });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: 'Usuario no encontrado' }); // Cambié a 401 Unauthorized para usuarios no encontrados
    }

    const hashedPassword = results[0].password;

    const passwordMatch = await bcrypt.compare(password, hashedPassword);

    if (passwordMatch) {
      const token = security.crearToken(results[0].id, username);
      res.json({ token });
    } else {
      return res.status(401).json({ error: 'Contraseña incorrecta' }); // Cambié a 401 Unauthorized para contraseña incorrecta
    }
  });
};

module.exports = {
  loginController,
};
