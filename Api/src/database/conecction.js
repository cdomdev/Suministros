const mysql = require('mysql');
const util = require('util'); 
const dotenv = require('dotenv')
dotenv.config()

const dbConfig = {
  host:process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database:process.env.DATABASE
};

const connection = mysql.createConnection(dbConfig);

// Promisify the connection
const query = util.promisify(connection.query).bind(connection);

connection.connect((error) => {
  if (error) {
    console.error('Error al conectar a la base de datos:', error);
  } else {
    console.log('Conexión a la base de datos exitosa');
  }
});

// Manejar errores de conexión
connection.on('error', (err) => {
  console.error('Error en la conexión a la base de datos:', err);
  if (err.code === 'PROTOCOL_CONNECTION_LOST') {
    console.log('La conexión con la base de datos se perdió. Intentando reconectar...');
    connection.connect();
  } else {
    throw err;
  }
});

// Cerrar la conexión al salir de la aplicación
process.on('exit', () => {
  console.log('Cerrando la conexión a la base de datos.');
  connection.end();
});

module.exports = { connection, query };
