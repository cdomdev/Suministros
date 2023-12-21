const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../../database/conecction'); 

const User = sequelize.define('usuarios', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  picture:{
    type: DataTypes.STRING,
    allowNull: true,
    unique:true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role:{
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'user'
  }
}, {
  tableName: 'usuarios',
  timestamps: false
});


module.exports = User;
