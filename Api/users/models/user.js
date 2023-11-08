const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');

const sequelize = new Sequelize(
  'database_app', 'root', '96747391', {
    host: 'localhost',
    dialect: 'mysql'
  }
);

const Users = sequelize.define('usuarios', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
  tableName: 'usuarios',
  timestamps: false // Deshabilitar las columnas createdAt y updatedAt
});

// Método personalizado para verificar una contraseña
Users.prototype.verifyPassword = function (password) {
  return bcrypt.compare(password, this.password);
};

Users.beforeCreate((user, options) => {
  return bcrypt.hash(user.password, 10)
    .then(hash => {
      user.password = hash;
    })
    .catch(err => {
      throw new Error(err);
    });
});

module.exports = Users;
