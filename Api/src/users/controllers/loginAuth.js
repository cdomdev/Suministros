const express = require('express');
const jwt = require('jsonwebtoken');
const user = require('../models/authModel');
const router = express.Router();

const claveSecreta = 'tu_clave_secreta'; // Reemplaza con una clave segura
const tiempoExpiracion = '1h';

const loginController = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userFromDB = await user.userExisting(email);

    if (userFromDB) {
      const passwordMatch = await user.passwordMatch(password, userFromDB.password);

      if (passwordMatch) {
        const { id, email, role } = userFromDB;

        const token = jwt.sign({ userId: id, email, role }, claveSecreta, {
          expiresIn: tiempoExpiracion,
        });

        let redirectTo = '/home'; // Redirige a la página de usuario normal por defecto

        if (role === 'admin') {
          redirectTo = '/admin'; // Redirige a la página de administrador
        }

        res.json({
          success: true,
          message: `Inicio de sesión exitoso (${role})`,
          user: { id, email, role },
          token,
          redirectTo,
        });
      } else {
        res.status(401).json({ success: false, message: 'Contraseña incorrecta' });
      }
    } else {
      res.status(401).json({ success: false, message: 'Usuario no encontrado' });
    }
  } catch (error) {
    console.error('Error en el controlador de inicio de sesión:', error);
    res.status(500).json({ success: false, message: 'Error en el servidor' });
  }
};

module.exports = loginController;
