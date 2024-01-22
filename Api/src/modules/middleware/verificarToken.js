const jwt = require('jsonwebtoken');
const claveSecreta = process.env.CLAVE_SECRETA

const verificarToken = (req, res, next) => {
    const token = req.headers.authorization;
  
    if (!token) {
      return res.status(401).json({ success: false, message: 'Acceso denegado. Token no proporcionado.' });
    }
  
    jwt.verify(token, claveSecreta, (err, decoded) => {
      if (err) {
        return res.status(401).json({ success: false, message: 'Token inválido.' });
      }
      
      // Agrega el usuario decodificado al objeto de solicitud (req)
      req.user = decoded; 
      console.log(`objeto decodificado de usuario ${req.user}`)
      next();
    });
  };
  

module.exports = verificarToken;