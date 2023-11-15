const {Sequelize, DataTypes} = require('sequelize');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv')
dotenv.config()

const sequelize = new Sequelize(
  process.env.DATABASE, process.env.USER, process.env.PASSWORD, {
    host: process.env.HOST,
    dialect: 'mysql'
  }
);

const Users = sequelize.define('usuarios', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type:  DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role:{
    type: DataTypes.INTEGER,
    allowNull: true, 
    defaultValue: 0, 
    }
}, {
  tableName: 'usuarios',
  timestamps: false 
});

Users.userExisting = async function (email) {
  return this.findOne({
    where: {
      email: email,
    },
  });
};

// Función para verificar si la contraseña coincide
Users.prototype.validPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};


module.exports = Users;
