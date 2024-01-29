const UserModel = require("../../models/userRegister");
const AuthModel = require("../../models/authModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const claveSecreta = process.env.CLAVE_SECRETA;
const { OAuth2Client } = require("google-auth-library");

const CLIENT_ID = process.env.CLIENT_ID;
const tiempoExpiracion = 3600;

const client = new OAuth2Client(CLIENT_ID);

// constrolador para el resgitro de usaurios

const registroController = async (req, res) => {
  const { name, email, password, googleToken } = req.body;
  const defaultPassword = process.env.PASSWORD_DEFAULT;

  try {
    if (googleToken) {
      // Registro con Google
      const userData = await verifyGoogleToken(googleToken);
      const user = await UserModel.findOne({
        where: { email: userData.email },
      });

      if (!user) {
        user = await UserModel.create({
          name: userData.name,
          email: userData.email,
          picture: userData.picture,
          password: defaultPassword,
          role: "user",
        });
      }

      const token = jwt.sign({ user }, claveSecreta, { expiresIn: 3600 });
      return res.status(201).json({
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
        expiresIn: 3600,
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
    console.log("este es el datos de userFrom", userFromDB);

    if (userFromDB) {
      const passwordMatch = await AuthModel.passwordMatch(
        password,
        userFromDB.password
      );
      console.log("que paso en la contraseña", passwordMatch);

      if (passwordMatch) {
        const { id, role, email, name } = userFromDB;

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

async function verifyGoogleToken(token) {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: CLIENT_ID,
  });
  const payload = ticket.getPayload();
  return payload;
}

const recoveryPassword = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await AuthModel.userExisting(email);

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
};
