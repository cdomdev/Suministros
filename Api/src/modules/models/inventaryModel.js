const { DataTypes } = require("sequelize");
const sequelize = require("../../database/conecction");

const Productos = sequelize.define(
  "Productos",
  {
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
          msg: "El title es requerido",
        },
      },
    },
    valor: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "El campo valor es requerido",
        },
        min: {
          args: [0],
          msg: "El valor debe ser un número positivo",
        },
      },
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "El campo descripcion es requerido",
        },
      },
    },
    referencia: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "El campo referencia es requerido",
        },
      },
    },
    categoria_Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Categoria",
        key: "id",
      },
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: "La ruta de la imagen es requerida",
        },
      },
    },
  },
    {
    tableName: "Productos",
    timestamps: true,
  }
);

// Modelo  para la tabla inventario

const Inventario = sequelize.define(
  "Inventario",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    producto_Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Productos",
        key: "id",
      },
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "La cantidad de productos es requerida",
        },
        min: {
          args: [0],
          msg: "La cantidad debe ser un número positivo",
        },
      },
    },
  },
  {
    tableName: "Inventario",
    timestamps: false,
  }
);
// Modelo de categorias 

const Categoria = sequelize.define(
  "Categoria",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre:{
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "La categoria es requerida",
        },
      },
    }
  },
  {
    tableName: "Categoria",
    timestamps: true,
  }
)
module.exports = {
  Productos,
  Inventario,
  Categoria,
};
