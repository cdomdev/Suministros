const { DataTypes, DATEONLY } = require("sequelize");
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
      type: DataTypes.INTEGER,
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
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "La categoria es requerida",
        },
      },
    },
  },
  {
    tableName: "Categoria",
    timestamps: true,
  }
);

// modelo de ofertas
const Ofertas = sequelize.define(
  "ofertas",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "El nombre es requerido",
        },
      },
    },
    descuento: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        notNull: {
          msg: "El campo porcentaje es requerido",
        },
      },
    },
    fecha_inicio: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: {
          msg: "El campo fecha inicio es requerido",
        },
      },
    },
    fecha_fin: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: {
          msg: "El campo fecha fin es requerido",
        },
      },
    },
  },
  {
    tableName: "ofertas",
    timestamps: false,
  }
);

// modeo de relacion entre productos y ofertas

const OfertasProductos = sequelize.define(
  "productos_ofertas",
  {
    id_ofertas: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    id_productos: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
  },
  {
    tableName: "productos_ofertas",
    timestamps: false,
  }
);

//------ Relaciones entre modelos ------

// productos - categorias
Productos.belongsTo(Categoria, { foreignKey: "categoria_id" });

// relacion invetario y porductos
Productos.hasMany(Inventario, { foreignKey: "producto_Id" });

// productos - tabla intermediara de ofertas
Productos.belongsToMany(Ofertas, {
  through: "productos_ofertas",
  foreignKey: "id_productos",
});

// tabla intermedia con relacion entre productos y ofertas
Ofertas.belongsToMany(Productos, {
  through: "productos_ofertas",
  foreignKey: "id_ofertas",
});

module.exports = {
  Productos,
  Inventario,
  Categoria,
  Ofertas,
  OfertasProductos,
};
