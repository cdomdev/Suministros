const jwt = require('jsonwebtoken');
const claveSecreta = 'esta_es_una_clave_para_token';

function crearToken(idUsuario, usuario) {
    // Almacenar información en un objeto
    const informacion = {
        usuario_id: idUsuario,
        usuario: usuario
    };
    // Generar JWT
    const token = jwt.sign(informacion, claveSecreta, { expiresIn: '1h' });
    return token;
}

function validarToken(req, res, next) {
    // Obtener el token del encabezado "Authorization"
    const token = req.headers.authorization;
    // Verificar y decodificar el token
    try {
        const tokenSplit = token.split(' ');
        const decodificado = jwt.verify(tokenSplit[1], claveSecreta);
        req.user = decodificado;
        next();
    } catch (error) {
        return res.status(401).send('Token de autorización inválido');
    }
}

module.exports = {
    crearToken,
    validarToken
};