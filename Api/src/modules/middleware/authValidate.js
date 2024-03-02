const { User }  = require('../models/usersModels')
const bcrypt = require('bcrypt');
const { OAuth2Client } = require("google-auth-library");


const CLIENT_ID = process.env.CLIENT_ID;
const client = new OAuth2Client(CLIENT_ID);

// Función para verificar si un usuario existe
async function userExisting(email) {
  return User.findOne({
    where: {email: email,},
  });
}

// Función para verificar si la contraseña coincide
async function passwordValidate(inputPassword, storedPassword) {
  return bcrypt.compare(inputPassword, storedPassword);
}

async function verifyGoogleToken(token) {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: CLIENT_ID,
  });
  const payload = ticket.getPayload();
  return payload;
}

module.exports = {
  userExisting,
  passwordValidate,
  verifyGoogleToken
};
