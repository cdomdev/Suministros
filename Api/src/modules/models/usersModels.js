const { DataTypes } = require("sequelize");
const sequelize = require("../../database/conecction");

const User = sequelize.define(
  "usuarios",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    picture: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "user",
    },
    telefono: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    direccion: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    detalles: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "usuarios",
    timestamps: false,
  }
);

// modelos de la compra usuario

const Pedido = sequelize.define(
  "pedido",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    metodo_pago: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    usuario_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    invitado_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: "pedido",
    timestamps: false,
  }
);

const DetallesPedido = sequelize.define(
  "detalles_pedido",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    pedido_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    producto_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    precio_unitario: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    sub_total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    descuento: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "detalles_pedido",
    timestamps: true,
  }
);

const Invitado = sequelize.define(
  "invitado",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    apellidos: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    direccion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    telefono: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    detalles: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "invitado",
    timestamps: false,
  }
);

// deficion de relaciones entre modelos

// realcion usuario - pedidos
Pedido.belongsTo(User, { foreignKey: "usuario_id" });
//  relacion invitado - pedidos
Pedido.belongsTo(Invitado, { foreignKey: "invitado_id" });

// relacion pedidos - detalles de pedido
DetallesPedido.belongsTo(Pedido, { foreignKey: "pedido_id" });

Pedido.hasMany(DetallesPedido, { foreignKey: "pedido_id" });

module.exports = {
  User,
  Pedido,
  DetallesPedido,
  Invitado,
};
