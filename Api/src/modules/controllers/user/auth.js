const { User } = require("../../models/usersModels");
const {
  passwordValidate,
  userExisting,
} = require("../../middleware/authValidate");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const getUserDataFromGoogle = require("../../middleware/getUserDataFromGoogle");
const CLIENT_ID = process.env.CLIENT_ID;
const claveSecreta = process.env.CLAVE_SECRETA;
const tiempoExpiracion = 3600;
const sendMailsRegistro = require('../../../../templates/sendMailsRegistro')


// inciio con google
const googleLogin = async (req, res) => {
  const { token } = req.body;
  const defaultPassword = process.env.PASSWORD_DEFAULT;
  try {
    // Verificar el token de acceso con Google
    const googleResponse = await axios.get(
      `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${token}`
    );

    // Verifica que el token sea válido y que pertenezca a tu cliente de Google
    if (googleResponse.data.audience === CLIENT_ID) {
      // Por ejemplo, puedes guardar el usuario en tu base de datos y generar un token JWT
      const userData = await getUserDataFromGoogle(token);

      // validar existencia de datos en db
      let user = await User.findOne({
        where: { email: userData.email },
      });

      if (!user) {
        user = await User.create({
          name: userData.name,
          email: userData.email,
          picture: userData.picture,
          password: defaultPassword,
          role: "user",
        });
        sendMailsRegistro(0, userData.name, userData.email)
      }

      return res.status(200).json({
        message: "Inicio de sesion exitoso",
        token,
        role: user.role,
        name: user.name,
        picture: user.picture,
        email: user.email,
        telefono: user.telefono,
        direccion: user.direccion,
      });
    } else {
      // El token no es válido para tu cliente de Google
      res.status(401).json({ error: "Token de acceso no válido" });
    }
  } catch (error) {
    console.error("Error al verificar el token de acceso:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// constrolador para el resgitro de usaurios

const registroController = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "El correo ya está registrado" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "user",
    });

    sendMailsRegistro(0, newUser.name, newUser.email, )

    const token = jwt.sign({ user: newUser }, claveSecreta, {
      expiresIn: 3600,
    });
    return res.status(201).json({
      message: "Registro exitoso",
      token,
      role: newUser.role,
      name: newUser.name,
      picture: newUser.picture,
      email: newUser.email,
      direccion: newUser.direccion,
      telefono: newUser.telefono 
    });
  } catch (error) {
    console.error("Error en el registro:", error);
    return res.status(500).json({ error: "Error en el registro" });
  }
};
// constrolador para el login de usuarios

const loginController = async (req, res) => {
  const { email1, password } = req.body;

  try {
    const userFromDB = await userExisting(email1);

    if (userFromDB) {
      const passwordMatch = await passwordValidate(
        password,
        userFromDB.password
      );
      if (passwordMatch) {
        const { role, email, name, telefono, direccion } = userFromDB;

        const token = jwt.sign(
          { userId: id, email, role, name },
          claveSecreta,
          {
            expiresIn: tiempoExpiracion,
          }
        );
        res.status(200).json({
          success: true,
          message: `Inicio de sesión exitoso (${role})`,
          name: name,
          role: role,
          token: token,
          email: email,
          telefono: telefono,
          direccion: direccion,
        });
      } else {
        res
          .status(401)
          .json({ success: false, message: "Contraseña incorrecta" });
      }
    } else {
      res
        .status(400)
        .json({ success: false, message: "Usuario no encontrado" });
    }
  } catch (error) {
    console.error("Error en el controlador de inicio de sesión:", error);
    res.status(500).json({ success: false, message: "Error en el servidor" });
  }
};

const recoveryPassword = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userExisting(email);

    if (!user) {
      return res.status(400).json({ message: "Usuario no encontrado" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const passwordUpdate = await UserModel.update(
      { password: hashedPassword },
      { where: { email: email } }
    );

    if (passwordUpdate[0] !== 0) {
      return res
        .status(200)
        .json({ message: "Contraseña actualizada con éxito" });
    } else {
      return res
        .status(500)
        .json({ message: "Error al actualizar la contraseña" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error en el proceso", error });
  }
};

module.exports = {
  registroController,
  loginController,
  recoveryPassword,
  googleLogin,
};
