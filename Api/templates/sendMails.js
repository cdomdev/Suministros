const nodemailer = require("nodemailer");

const USER_MAIL = process.env.USER_FROM_MAILS;
const PASS_MAILS = process.env.PASS_FOR_MAILS;

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: USER_MAIL,
    pass: PASS_MAILS,
  },
});

// mail para registros
module.exports = function (cualNotificacion, nombre, email) {
  // Notificaciones
  let notificaciones = [
    // registro
    {
      subject: "Nuevo registro",
      titulo: "¡Gracias por tu registro!",
      notificacion: "Hola " + nombre + " Gracias por tu registro ",
    },
    {
      subject: "Correo programado",
      titulo: "Correo programado",
      notificacion:
        "Hola, este correo ha sido enviado porque se programó con node-cron.",
    },
  ];
  let mensajeHtml = `<!DOCTYPE html>
  <html lang="es">
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
          p, a, h1, h2, h3, h4, h5, h6 {font-family: 'Roboto', sans-serif !important;}
          h1{ font-size: 30px !important;}
          h2{ font-size: 25px !important;}
          h3{ font-size: 18px !important;}
          h4{ font-size: 16px !important;}
          p, a{font-size: 15px !important;}
        
          .imag{
              width: 20px;
              height: 20px;
          }
          .contA{
              margin: 0px 5px 0 5px;
          }
          .afooter{
              color: white;
              text-decoration: none;
              font-size: 13px !important;
          }
          .enlace-web{
              text-decoration: none;
              font-size: 15px;
          }
  
      </style>
  </head>
  <body>
      <div style="width: 100%; background-color: #e3e3e3;">
          <div style="padding: 20px 10px 20px 10px;">
              <!-- Imagen inicial -->
              <div style="background-color:#283765 !important; padding: 10px 0px 10px 0px; width: 100%; text-align: center;">
              <img src="cid:logo" alt="logo" style="width: 200px; height: 35px;">
          </div>
              <!-- Imagen inicial -->
  
              <!-- Contenido principal -->
              <div style="background-color: #ffffff; padding: 20px 0px 5px 0px; width: 100%; text-align: center;">
                  <h1>${notificaciones[cualNotificacion].titulo}</h1>
                  <p>${notificaciones[cualNotificacion].notificacion}</p>
                  <!-- Gracias -->    
                  <!-- enlcae -->
                  <a  href="http://localhost:5173/suministros/home" class="enlace-web" style="padding: 20px 0">Visitanos y realiza tu primera compra</a>
              </div>
              <!-- Contenido principal -->
              <!-- footere -->
              <div style="background-color: #283765; color:#dcdcdc; padding: 15px 0px 0px 0px; width: 100%; text-align: center;">
                  <!-- Redes sociales -->
                  <a href="https://www.facebook.com/pretwor" class="contA"><img src="cid:fb" class="imag" /></a>
                  <a href="https://www.instagram.com/pretwor/" class="contA"><img src="cid:ig" class="imag" /></a>
                  <a href="https://wa.me/573224294332" class="contA"><img src="cid:wapp" class="imag" /></a>
                  <a href="mailto:contacto@pretwor.com" class="contA"><img src="cid:em" class="imag" /></a>
                  <!-- Redes sociales -->
  
                  <h4>¡ Si necesitas ayuda con tu compra !</h4>
                  <p style="font-size: 13px; padding: 0px 20px 0px 20px;">
                      Comunícate con nosotros por los siguientes medios:<br>
                      Correo: <a class="afooter" href="mailto:suministros@soporte.com">suministros@soporte.com</a><br>
                      Whatsapp: <a class="afooter" href="https://wa.me/573224294332">+57 322 424 2012</a><br>
                  </p>
                  <p style="background-color:rgb(51, 51, 51); padding: 10px 0px 10px 0px; font-size: 15px !important;">
                    Suministros
                  </p>
              </div>
          </div>
      </div>
  </body>
  </html>
  `;
  // Plantilla de correo

  // Notificar o enviar correo
  transporter.verify().then(console.log).catch(console.error);
  transporter
    .sendMail({
      from: '"Suministros" <youremail@gmail.com>',
      to: email,
      subject: notificaciones[cualNotificacion].subject,
      text: notificaciones[cualNotificacion].notificacion,
      html: mensajeHtml,
      attachments: [
        {
          filename: "fb.png",
          path: "./public/images/fb.png",
          cid: "fb",
        },
        {
          filename: "ig.png",
          path: "./public/images/ig.png",
          cid: "ig",
        },
        {
          filename: "wapp.png",
          path: "./public/images/wapp.png",
          cid: "wapp",
        },
        {
          filename: "em.png",
          path: "./public/images/em.png",
          cid: "em",
        },
        {
          filename: "logo.webp",
          path: "./public/images/logo.webp",
          cid: "logo",
        },
      ],
    })
    .then((info) => {
      console.log({ info });
    })
    .catch(console.error);
  // Notificar o enviar correo
};
