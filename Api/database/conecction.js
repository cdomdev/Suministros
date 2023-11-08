const mysql = require('mysql');
const util = require('util'); // Para utilizar promesas

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '96747391',
  database: 'database_app'
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
