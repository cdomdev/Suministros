const mysql = require('mysql');
const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '96747391',
    database: 'database_app'
});
  
conexion.connect(function (error) {
    if (error) throw error;
    console.log('La conexion a la base de datos ah sido exitosa');
});
 
module.exports = { conexion };