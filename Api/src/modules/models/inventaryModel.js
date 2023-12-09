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
        msg: 'El campo marca es requerido',
      },
      len: {
        args: [1, 100],
        msg: 'La marca debe tener entre 1 y 100 caracteres',
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
  descripcion: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'El campo descripcion es requerido',
      },
      len: {
        args: [1, 255],
        msg: 'La descripcion debe tener entre 1 y 255 caracteres',
      },
    },
  },
  imagen: {
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
