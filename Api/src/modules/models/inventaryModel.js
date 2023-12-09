const { DataTypes } = require('sequelize');
const sequelize = require('../../database/conecction');

const Inventario = sequelize.define('Inventario', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'El title es requerido',
      },
    },
  },
  valor: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'El campo valor es requerido',
      },
      min: {
        args: [0],
        msg: 'El valor debe ser un número positivo',
      },
    },
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'El campo descripcion es requerido',
      },
    },
  },
  image: {
    type: DataTypes.TEXT, 
    allowNull: false,
    validate: {
      notNull: {
        msg: 'La ruta de la imagen es requerida',
      },
    },
  },
}, {
}, {
  tableName: 'inventario',
  timestamps: false,
});

module.exports = Inventario;
