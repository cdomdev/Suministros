// controladores/registroController.js
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registroController = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'El correo ya está registrado' });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({ name, email, password: hashedPassword });
      const token = jwt.sign({ user: newUser }, 'secreto-seguro', { expiresIn: '1h' });
      return res.status(201).json({ message: 'Registro exitoso', token });
    }
  } catch (error) {
    console.error('Error en el registro:', error);
    return res.status(500).json({ error: 'Error en el registro' });
  }
};


module.exports = registroController;