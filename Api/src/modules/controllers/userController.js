const User = require('../models/userRegister');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const claveSecreta = process.env.CLAVE_SECRETA;
const { OAuth2Client } = require('google-auth-library');
const CLIENT_ID = process.env.CLIENT_ID;

const client = new OAuth2Client(CLIENT_ID);

const registroController = async (req, res) => {
  const { name, email, password, googleToken } = req.body;
  const defaultPassword = 'googleAuthUser';

  try {

    if (googleToken) {
      // Registro con Google
      const userData = await verifyGoogleToken(googleToken);
      console.log(`token del usuario ${googleToken}`)
      let user = await User.findOne({ where: { email: userData.email } });

      if (!user) {
        user = await User.create({ name: userData.name, email: userData.email, password:defaultPassword, role: 'user' });
      }

      const token = jwt.sign({ user }, claveSecreta, { expiresIn: '1h' });
      return res.status(201).json({ message: 'Inicio de sesion exitoso', token, role: user.role });
    } else {
      
      // Registro normal
      const existingUser = await User.findOne({ where: { email } });

      if (existingUser) {
        return res.status(400).json({ error: 'El correo ya está registrado' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({ name, email, password: hashedPassword, role: 'user' });

      const token = jwt.sign({ user: newUser }, claveSecreta, { expiresIn: '1h' });
      return res.status(201).json({ message: 'Registro exitoso', token, role: newUser.role });
    }
  } catch (error) {
    console.error('Error en el registro:', error);
    return res.status(500).json({ error: 'Error en el registro' });
  }
};

async function verifyGoogleToken(token) {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: CLIENT_ID,
  });
  const payload = ticket.getPayload();
  return payload;
}

module.exports = registroController;
