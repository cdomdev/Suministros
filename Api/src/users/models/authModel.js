const bcrypt = require('bcrypt');
const User = require('./user'); // Ajusta la ruta según la ubicación real de tu modelo de usuario

// Función para verificar si un usuario existe
async function userExisting(email) {
  return User.findOne({
    where: {
      email: email,
    },
  });
}

// Función para verificar si la contraseña coincide
async function passwordMatch(inputPassword, storedPassword) {
  return bcrypt.compare(inputPassword, storedPassword);
}

module.exports = {
  userExisting,
  passwordMatch,
};
