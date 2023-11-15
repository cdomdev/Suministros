const mysql = require('mysql2/promise');
const util = require('util');
const dotenv = require('dotenv');
dotenv.config();

const dbConfig = {
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
};

const createConnection = async () => {
  const connection = await mysql.createConnection(dbConfig);

  // Promisify the connection and query
  connection.query = util.promisify(connection.query);
  
  try {
    await connection.connect();
    console.log('Conexión a la base de datos exitosa');
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
  }

  // Manejar errores de conexión
  connection.on('error', (err) => {
    console.error('Error en la conexión a la base de datos:', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.log('La conexión con la base de datos se perdió. Intentando reconectar...');
      createConnection(); // Reintenta la conexión
    } else {
      throw err;
    }
  });

  // Cerrar la conexión al salir de la aplicación
  process.on('exit', () => {
    console.log('Cerrando la conexión a la base de datos.');
    connection.end();
  });

  return connection;
};

module.exports = createConnection;
