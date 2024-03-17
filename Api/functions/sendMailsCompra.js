import  nodemailer from "nodemailer";

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
export function sendMailsCompra(cualNotificacion, nombre, email, pedido, dataProducts) {
  // Definir las notificaciones
  const notificaciones = [
    // compra
    // Notificacion para usuario
    {
      subject: `Nueva compra`,
      titulo: `¡Hola ${nombre}, tu compra fue realizada con exito ! `,
      mensaje: `Acontinuacion un resumen de tu compra`,
    },
    // notificaion para administrador
    {
      subject: "Nueva compra",
      titulo: `¡Se realizo una nueva compra a nombre de ${nombre}!`,
      mensaje: `Hola Admin , el usuario ${nombre} realizo nuevo pedido`,
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
    
              .contA {
                  margin: 0px 5px 0 5px;
              }
      
              .afooter {
                  color: white;
                  text-decoration: none;
                  font-size: 13px;
              }
      
    
          </style>
      </head>
  
      <body>
  
          <div class="container"
              style="  width: 100%; background-color: #e3e3e3;">
              <div style=" padding: 20px 10px;">
                  <!-- Encabezado -->
                  <div
                      style="background-color: #283765; padding: 10px 0px 10px 0px; width: 100%; text-align: center;">
                      <img src="cid:logo" alt style="width: 180px; height: 31px;">
                  </div>
                  <!-- Encabezado -->
  
                  <!-- Contenido principal -->
                  <div
                      style="background-color: #ffffff; padding: 30px 0px 25px 0px; width: 100%; text-align: center;">
                      <h1
                          style="font-size: 25px; font-weight: 500;">${notificaciones[cualNotificacion].titulo}</h1>
                      <h2
                          style="font-size: 17px; font-weight: 500;">${notificaciones[cualNotificacion].mensaje}</h2>
  
                      <!-- Detalles del pedido -->
                      <div style=" width: 450px; margin: auto;">
                          <!-- Otros detalles del pedido -->
                          <table
                              style="border-collapse: collapse; border: 2px solid #ccc; margin: auto; width: 100%;">
                              <thead style="background-color: #818ba9;">
                                  <tr>
                                      <th
                                          style="border: 1px solid #ccc; padding: 8px;">Productos</th>
                                      <th
                                          style="border: 1px solid #ccc; padding: 8px;">Valor</th>
                                  </tr>
                              </thead>
                              <tbody>
                                  ${dataProducts.map(producto => `
                                  <tr>
                                      <td style="border: 1px solid  #ccc;" >${producto.nombre}</td>
                                      <td style="border: 1px solid #ccc;">${producto.valor}</td>
                                  </tr>
                                  `).join('')}
                              </tbody>
                              <tfoot>
                                  <tr>
                                      <td colspan="2"
                                          style="border: 1px solid #ccc; padding: 8px; font-weight: bold; text-align: center;">Total:
                                          ${pedido.total}</td>
                                  </tr>
                              </tfoot>
                          </table>
                          <!-- Otros detalles del pedido -->
  
                      </div>
  
                      <!-- Botón -->
                      <a href="http://localhost:5173/suministros/home"
                          style="text-decoration: none; text-align: center; font-weight: bold; text-decoration: underline; font-size: 16px; color: #283765; border-radius: 14px;">Ir
                          a la tienda</a>
                  </div>
  
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
  
                      <h4 style="font-weight: 500;">¡ Si tienes dudas sobre tu
                          compra !</h4>
                      <p style="font-size: 13px; padding: 0px 20px;">
                          Comunícate con nosotros por los siguientes medios:<br>
                          Correo: <a class="afooter"
                              href="mailto:soporte@suministros.com">soporte@suministros.com</a><br>
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
      { filename: "fb.png", path: "./public/images//fb.png", cid: "fb" },
      { filename: "ig.png", path: "./public/images/ig.png", cid: "ig" },
      { filename: "wapp.png", path: "./public/images//wapp.png", cid: "wapp" },
      { filename: "em.png", path: "./public/images/em.png", cid: "em" },
      { filename: "logo.webp", path: "./public/images/logo.webp", cid: "logo" },
    ],
  };

//   const r = require('./../../public/images/')

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

// module.exports = enviarCorreo;
