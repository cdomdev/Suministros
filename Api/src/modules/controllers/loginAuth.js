const express = require('express');
const jwt = require('jsonwebtoken');
const user = require('../models/authModel');
const router = express.Router();

const claveSecreta = process.env.CLAVE_SECRETA; 
const tiempoExpiracion = '1h';

const loginController = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userFromDB = await user.userExisting(email);

    if (userFromDB) {
      const passwordMatch = await user.passwordMatch(password, userFromDB.password);

      if (passwordMatch) {
        const { id, role, email, name } = userFromDB;
      
        const token = jwt.sign({ userId: id, email, role, name}, claveSecreta, {
          expiresIn: tiempoExpiracion,
        });
        res.json({
          success: true,
          message: `Inicio de sesión exitoso (${role})`,
          name: name,
          role: role,
          token: token
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
