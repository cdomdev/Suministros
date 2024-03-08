const nodemailer = require("nodemailer");

const USER_MAIL = process.env.USER_FROM_MAILS;
const PASS_MAILS = process.env.PASS_FOR_MAILS;

// Configuración del transporte de correos
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: USER_MAIL,
    pass: PASS_MAILS,
  },
});

// Función para enviar correo de notificación
function enviarCorreo(cualNotificacion, nombre, email) {
  // Definir las notificaciones
  const notificaciones = [
    // Registro
    {
      subject: "Nuevo registro",
      titulo: `¡Bienvenido(a) ${nombre}! Gracias por tu registro`,
      mensaje: "Visita nuestra tienda y realiza tu primera compra",
    },
    // Correo programado
    {
      subject: "Correo programado",
      titulo: "Correo programado",
      mensaje:
        "Este correo ha sido enviado debido a una programación con node-cron.",
    },
  ];

  // Construir el contenido HTML del correo
  const mensajeHtml = `
  <!DOCTYPE html>
  <html lang="es">
  
      <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            * {
                font-family: 'Roboto', sans-serif !important;
            }
    
            .imag {
                width: 20px;
                height: 20px;
                align-self: center;
            }
    
            .contA {
                margin: 0px 5px 0 5px;
            }
    
            .afooter {
                color: white;
                text-decoration: none;
                font-size: 13px !important;
            }
    
            footer {
                background-color: #283765;
                color: #dcdcdc;
                padding: 15px 0px 0px 0px;
                width: 100%;
                text-align: center;
            }
    
            .contA {
                margin: 0px 5px 0 5px;
            }
    
            .afooter {
                color: white;
                text-decoration: none;
                font-size: 13px;
            }
    
            footer h4 {
                margin: 10px 0 0 0;
            }
    
            footer p {
                margin: 10px 0 0 0;
                padding: 1em 0;
            }
    
            .f-footer-company {
                background-color: rgb(51, 51, 51);
                padding: 10px 0px 10px 0px;
                font-size: 16px;
                text-transform: uppercase;
            }
        </style>
      </head>
  
      <body>
  
          <div class="container"
              style="  width: 100%; background-color: #e3e3e3;">
              <div style=" padding: 20px 10px;">
                  <!-- Encabezado -->
                  <div style="background-color: #283765; padding: 10px 0px 10px 0px; width: 100%; text-align: center;">
                      <img src="cid:logo" alt="" style="width: 180px; height: 31px;">
                  </div>
                  <!-- Encabezado -->
  
                  <div
                      style="background-color: #ffffff; padding: 30px 0px 25px 0px; width: 100%; text-align: center;">
                      <h1 style="font-size: 25px;">${notificaciones[cualNotificacion].titulo}</h1>
                      <h2 style="font-size: 17px;">${notificaciones[cualNotificacion].mensaje}</h2>
  
                      <!-- Botón -->
                      <a href="http://localhost:5173/suministros/home"
                          style="text-decoration: none; text-align: center; font-weight: bold; text-decoration: underline; font-size: 16px; color: #283765; border-radius: 14px;">Ir
                          a la tienda</a>
                  </div>
                  <!-- Contenido principal -->
  
                  <!-- footere -->
                  <div
                      style="background-color: #283765; color: #ffffff; padding: 20px 0px 0px 0px; width: 100%; text-align: center;">
                      <!-- Redes sociales -->
                      <a href="https://www.facebook.com/pretwor"
                          class="contA"><img src="cid:fb" class="imag" /></a>
                      <a href="https://www.instagram.com/pretwor/"
                          class="contA"><img src="cid:ig" class="imag" /></a>
                      <a href="https://wa.me/573224294332" class="contA"><img
                              src="cid:wapp" class="imag" /></a>
                      <a href="mailto:contacto@pretwor.com" class="contA"><img
                              src="cid:em" class="imag" /></a>
                      <!-- Redes sociales -->
  
                      <h4>¡ Tienes alguna duda !</h4>
                      <p style="font-size: 13px; padding: 0px 20px;">
                          Comunícate con nosotros por los siguientes medios:<br>
                          Correo: <a class="afooter"
                              href="mailto:proyectos@pretwor.com">proyectos@pretwor.com</a><br>
                          Whatsapp: <a class="afooter"
                              href="https://wa.me/573224294332">+57 322 429
                              4332</a><br>
                      </p>
                      <p
                          style="background-color: rgb(67, 65, 65); padding: 10px 0px; font-size: 13px !important; text-transform: uppercase;">
                          Suministros
                      </p>
                  </div>
              </div>
          </div>
      </body>
  
  </html>
  `;

  // Configuración del correo
  const mailOptions = {
    from: '"Suministros" <youremail@gmail.com>',
    to: email,
    subject: notificaciones[cualNotificacion].subject,
    text: notificaciones[cualNotificacion].notificacion,
    html: mensajeHtml,
    attachments: [
      { filename: "fb.png", path: "./public/images/fb.png", cid: "fb" },
      { filename: "ig.png", path: "./public/images/ig.png", cid: "ig" },
      { filename: "wapp.png", path: "./public/images/wapp.png", cid: "wapp" },
      { filename: "em.png", path: "./public/images/em.png", cid: "em" },
      { filename: "logo.webp", path: "./public/images/logo.webp", cid: "logo" },
    ],
  };

  // Verificar conexión y enviar correo
  transporter
    .verify()
    .then(() => {
      return transporter.sendMail(mailOptions);
    })
    .then((info) => {
      console.log("Correo enviado:", info);
    })
    .catch((error) => {
      console.error("Error al enviar correo:", error);
    });
}

module.exports = enviarCorreo;
