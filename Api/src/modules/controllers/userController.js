const UserModel = require("../models/userRegister");
const AuthModel = require("../models/authModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const claveSecreta = process.env.CLAVE_SECRETA;
const { OAuth2Client } = require("google-auth-library");

const CLIENT_ID = process.env.CLIENT_ID;
const tiempoExpiracion = "1h";

const client = new OAuth2Client(CLIENT_ID);

// constrolador para el resgitro de usaurios

const registroController = async (req, res) => {
  const { name, email, password, googleToken } = req.body;
  const defaultPassword = process.env.PASSWORD_DEFAULT;
  console.log(defaultPassword);

  try {
    if (googleToken) {
      // Registro con Google
      const userData = await verifyGoogleToken(googleToken);
      console.log(`token del usuario ${googleToken}`);
      let user = await UserModel.findOne({ where: { email: userData.email } });

      if (!user) {
        user = await UserModel.create({
          name: userData.name,
          email: userData.email,
          picture: userData.picture,
          password: defaultPassword,
          role: "user",
        });
      }

      const token = jwt.sign({ user }, claveSecreta, { expiresIn: "1h" });
      return res
        .status(201)
        .json({
          message: "Inicio de sesion exitoso",
          token,
          role: user.role,
          name: user.name,
          picture: user.picture,
          email: user.email,
        });
    } else {
      // Registro normal
      const existingUser = await UserModel.findOne({ where: { email } });

      if (existingUser) {
        return res.status(400).json({ error: "El correo ya está registrado" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await UserModel.create({
        name,
        email,
        password: hashedPassword,
        role: "user",
      });

      const token = jwt.sign({ user: newUser }, claveSecreta, {
        expiresIn: "1h",
      });
      return res
        .status(201)
        .json({ message: "Registro exitoso", token, role: newUser.role });
    }
  } catch (error) {
    console.error("Error en el registro:", error);
    return res.status(500).json({ error: "Error en el registro" });
  }
};

// constrolador para el login de usuarios

const loginController = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userFromDB = await AuthModel.userExisting(email);

    if (userFromDB) {
      const passwordMatch = await AuthModel.passwordMatch(
        password,
        userFromDB.password
      );

      if (passwordMatch) {
        const { id, role, email, name } = userFromDB;

        const token = jwt.sign(
          { userId: id, email, role, name },
          claveSecreta,
          {
            expiresIn: tiempoExpiracion,
          }
        );
        res.json({
          success: true,
          message: `Inicio de sesión exitoso (${role})`,
          name: name,
          role: role,
          token: token,
        });
      } else {
        res
          .status(401)
          .json({ success: false, message: "Contraseña incorrecta" });
      }
    } else {
      res
        .status(401)
        .json({ success: false, message: "Usuario no encontrado" });
    }
  } catch (error) {
    console.error("Error en el controlador de inicio de sesión:", error);
    res.status(500).json({ success: false, message: "Error en el servidor" });
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



module.exports = {
  registroController,
  loginController,
};
