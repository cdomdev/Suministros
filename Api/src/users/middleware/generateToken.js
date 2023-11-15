const jwt = require('jsonwebtoken');
const claveSecreta = 'esta_es_una_clave_para_token';

function crearToken(idUsuario, usuario) {
    const informacion = {
        usuario_id: idUsuario,
        usuario: usuario
    };
    const token = jwt.sign(informacion, claveSecreta, { expiresIn: '1h' });
    return token;
}

module.exports = {
    crearToken,
};
