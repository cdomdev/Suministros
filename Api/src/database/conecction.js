const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

// Configuración de la base de datos
const dbConfig = {
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
};

// Crear conexión de Sequelize
const sequelize = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, {
  host: dbConfig.host,
  dialect: 'mysql',
  // Más opciones de configuración según sea necesario
});

// Verificar la conexión y sincronizar modelos
sequelize.sync()
  .then(() => {
    console.log('Conexión a la base de datos exitosa (Sequelize)');
  })
  .catch((error) => {
    console.error('Error al conectar a la base de datos (Sequelize):', error.message);
  });

// Exportar la instancia de Sequelize
module.exports = sequelize;
