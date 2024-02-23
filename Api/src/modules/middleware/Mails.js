// Importa el módulo de Nodemailer
const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
// Credenciales
const USER_MAIL = process.env.USER_FROM_MAILS;
const PASS_MAILS = process.env.PASS_FOR_MAILS;

// Transportador SMTP
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: USER_MAIL,
    pass: PASS_MAILS,
  },
});

// Función para enviar correos electrónicos
const sendEmailCompra = async (destinatario, asunto, contenido) => {

  const plantillaPath = path.join(__dirname, "../../templates/compra.html");
  const contenidoPlantilla = fs.readFileSync(plantillaPath, "utf-8");

  // Detalles del correo
  const mailOptions = {
    from: USER_MAIL,
    to: destinatario,
    subject: asunto,
    html: contenidoPlantilla,
  };

  try {
    // Envía el correo electrónico
    const info = await transporter.sendMail(mailOptions);
    console.log("Correo electrónico enviado:", info.response);
    return info.response;
  } catch (error) {
    console.log("Error al enviar el correo electrónico:", error);
    throw error;
  }
};

// funcion para enviar correos con plantillas html
const sendEmailWithTemplate = async (destinatario, asunto, plantilla) => {
  try {
    // Construir la ruta completa de la plantilla
    const plantillaPath = path.join(__dirname, "../../templates/registro.html");

    // Leer el contenido de la plantilla
    const contenido = fs.readFileSync(plantillaPath, "utf-8");

    const mailOptions = {
      from: SUMINISTROS,
      to: destinatario,
      subject: asunto,
      html: contenido,
    };

    // Enviar el correo
    const info = await transporter.sendMail(mailOptions);
    console.log("Correo electrónico enviado", info.response);
    return info.response;
  } catch (error) {
    console.log("Error al enviar el correo electrónico", error);
    throw error;
  }
};

module.exports = {
  sendEmailCompra,
  sendEmailWithTemplate,
};
