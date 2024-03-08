const path = require("path");
const fs = require("fs");
const Sequelize = require("sequelize");
const {
  Productos,
  Inventario,
  Categoria,
  Ofertas,
  Pedido,
  DetallesPedido,
} = require("../../models/inventaryModel");
const { User, Invitado } = require("../../models/usersModels");
const {
  calcularCantidad,
  calcularTotal,
  subTotal,
} = require("../../utils/valoresDeProductos");
const { sendEmailCompra } = require("../../middleware/Mails");
const sequelize = require("../../../database/conecction");
const { userExisting } = require("../../middleware/authValidate");

const sendMailsCompra = require('../../../../templates/sendMailsCompra')


const listarProductos = async (req, res) => {
  try {
    const productos = await Productos.findAll({
      attributes: [
        "id",
        "title",
        "nombre",
        "valor",
        "description",
        "image",
        "referencia",
        "categoria_id",
      ],
      include: [
        {
          model: Inventario,
          attributes: ["cantidad"],
        },
        {
          model: Categoria,
          attributes: ["nombre"],
        },
      ],
    });
    res.json({ productos: productos });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Error al obtener los productos" });
  }
};

// listar categorias

const listarCategoriaProducto = async (req, res) => {
  try {
    const { codigoProducto } = req.params;

    const categoriaConProductos = await Categoria.findOne({
      where: { codigo: codigoProducto },
      attributes: ["id", "nombre"],
      include: [
        {
          model: Productos,
          attributes: [
            "id",
            "title",
            "nombre",
            "valor",
            "description",
            "image",
            "referencia",
          ],
        },
      ],
    });

    if (!categoriaConProductos) {
      return res.status(404).json({ error: "Categoría no encontrada" });
    }

    res.json({ categoria: categoriaConProductos });
  } catch (e) {
    console.error(e);
    res
      .status(500)
      .json({ error: "Error al obtener la categoría con productos" });
  }
};

const listarOfertas = async (req, res) => {
  try {
    const response = Ofertas.findAll();
    if (response) {
      res.json({ categoria: response });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Error al obtener las ofertas" });
  }
};

const buscarProductos = (req, res) => {
  const { query } = req.body;

  // Realizar la búsqueda
  Productos.findAll({
    where: {
      nombre: Sequelize.where(
        Sequelize.fn("LOWER", Sequelize.col("nombre")),
        "LIKE",
        `%${query.toLowerCase()}%`
      ),
    },
  })
    .then((resultados) => {
      if (resultados && resultados.length > 0) {
        return res
          .status(200)
          .json({ message: "Productos encontrados", resultados: resultados });
      } else {
        return res.status(404).json({
          message: "No se encontraron productos para la búsqueda proporcionada",
        });
      }
    })
    .catch((err) => {
      return res.status(500).json({
        message: "Error en el servidor al buscar productos",
        error: err,
      });
    });
};

const finalizarCompraInvitado = async (req, res) => {
  try {
    const { dataProducts, dataUser, metodoPago } = req.body;

    // validacion de datos
    if (!dataProducts || !dataUser) {
      return res
        .status(401)
        .json({ message: "Faltan datos para prcesar la compra" });
    }

    console.log(dataProducts);
    console.log(dataUser);
    console.log(metodoPago);
    // crear el nuevo invitado
    const { nombre, apellidos, email, direccion, telefono, detalles } =
      dataUser;

    const usuarioInvitado = await Invitado.create({
      nombre: nombre,
      apellidos: apellidos,
      direccion: direccion,
      telefono: telefono,
      email: email,
      detalles: detalles,
    });

    // validacion de la creacion de ususaio invitado

    if (!usuarioInvitado) {
      return res.status(500).json({ message: "Error al crear el usuario" });
    }
    // crear pedido
    const nuevoPedido = await Pedido.create({
      total: calcularTotal(dataProducts),
      cantidad: calcularCantidad(dataProducts),
      metodo_pago: metodoPago,
      invitado_id: usuarioInvitado.id,
      usuario_id: null,
    });

    // validar cracion del pedido

    if (!nuevoPedido) {
      return res.status(500).json({ message: "Error al crear el pedido" });
    }

    // crear detalles del pédido
    for (const producto of dataProducts) {
      console.log("detalles del producto", producto);
      console.log("detalles del producto", producto.valor);
      console.log("detalles del producto", producto.cantidad);
      await DetallesPedido.create({
        pedido_id: nuevoPedido.id,
        producto_id: producto.id,
        cantidad: calcularCantidad(dataProducts),
        precio_unitario: producto.valor,
        sub_total: subTotal(dataProducts),
        descuento: 0,
      });
    }

    // Enviar email invitado
    sendMailsCompra(0, usuarioInvitado.nombre, usuarioInvitado.email)

    // enviar respuesta de la solcitud

    return res.status(200).json({ message: "Compra realzida con exito" });
  } catch (e) {
    console.log("Error al finalizar la compra", e);
    return res.status(500).json({ message: "Error interno en el servidor" });
  }
};

const finalizarCompraUsuario = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { dataProducts, dataUser, metodoPago } = req.body;
    // Validación de datos
    if (!dataProducts || !dataUser || !metodoPago) {
      return res.status(400).json({ message: "Faltan datos de la compra" });
    }

    // Validar el usuario en base de datos
    let user = await User.findOne({ where: { email: dataUser.email } });

    if (!user) {
      await t.rollback();
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Actualizar datos del usuario si se proporcionan
    if (dataUser.telefono || dataUser.direccion || dataUser.detalles) {
      await User.update(
        {
          telefono: dataUser.telefono || user.telefono,
          direccion: dataUser.direccion || user.direccion,
          detalles: dataUser.detalles || user.detalles,
        },
        { where: { email: dataUser.email } }
      );
    }

    // Crear pedido
    const nuevoPedido = await Pedido.create({
      total: calcularTotal(dataProducts),
      cantidad: calcularCantidad(dataProducts),
      metodo_pago: metodoPago,
      invitado_id: null,
      usuario_id: user.id,
      transaction: t,
    });

    // Validar creación del pedido
    if (!nuevoPedido) {
      return res.status(500).json({ message: "Error al crear el pedido" });
    }

    // Crear detalles del pedido
    for (const producto of dataProducts) {
      await DetallesPedido.create({
        pedido_id: nuevoPedido.id,
        producto_id: producto.id,
        cantidad: producto.cantidad,
        precio_unitario: producto.valor,
        sub_total: producto.valor * producto.cantidad,
        descuento: 0,
        transaction: t,
      });
    }

    console.log(nuevoPedido)
    // Enviar correo electrónico usuario
    sendMailsCompra(0, user.name, user.email, nuevoPedido.nombre)

    await t.commit();

    return res.status(200).json({ message: "Compra realizada con éxito" });
  } catch (error) {
    await t.rollback();
    console.error("Error al finalizar la compra", error);
    return res.status(500).json({ message: "Error interno en el servidor" });
  }
};

const construirContenidoCorreo = (user, dataProducts) => {
  // Leer el contenido de la plantilla de correo electrónico
  const plantillaPath = path.join(__dirname, "../../../templates/compra.html");
  const contenidoPlantilla = fs.readFileSync(plantillaPath, "utf-8");

  // Inicializar el contenido del correo con la plantilla base
  const contenidoCorreo = contenidoPlantilla
    .replace("{{nombre_usuario}}", user.nombre)
    .replace("{{detalles_productos}}", productosHTML)
    .replace("{{precio_total}}", precioTotal);

  // Inicializar variables para contener los detalles de la compra
  let productosHTML = "";
  let precioTotal = 0;

  // Iterar sobre cada producto y construir la sección de productos en HTML
  for (const producto of dataProducts) {
    productosHTML += `
    <li>Producto: ${producto.nombre}</li>
    <li>Precio: ${producto.valor}</li>
  `;
    precioTotal += parseFloat(producto.valor * producto.cantidad);
  }

  // Reemplazar la sección de productos en la plantilla con los detalles de la compra
  contenidoCorreo = contenidoCorreo.replace(
    "{{detalles_productos}}",
    productosHTML
  );

  // Reemplazar el marcador de posición del precio total
  contenidoCorreo = contenidoCorreo.replace("{{precio_total}}", precioTotal);

  return contenidoCorreo;
};

const obtenerDatosUsuario = async (req, res) => {
  const { email } = req.query;

  console.log(email);
  try {
    const dataUser = await User.findAll({ where: { email } });
    if (!dataUser || dataUser.length === 0) {
      return res.status(400).json({ message: "No existen datos del usuario" });
    }

    const { name, picture } = dataUser[0];
    res.status(200).json({ name, picture });
  } catch (error) {
    console.log("Error interno del servidor", error);
    res.status(500).json({ message: "Error interno en el servidor" });
  }
};

const actulizarDatosDeUsuario = async (req, res) => {
  const { email, dataUpdate } = req.body;

  try {
    // Validar la existencia del usuario en la base de datos
    const existingUser = await userExisting(email);

    if (!existingUser) {
      return res.status(400).json({ message: "El usuario no existe" });
    }

    // Actualizar los datos del usuario
    const { name, apellidos, telefono, direccion } = dataUpdate;

    const updatedUser = await User.update(
      { name, apellidos, telefono, direccion },
      { where: { email: email } }
    );

    // Verificar si la actualización fue exitosa
    if (updatedUser[0] === 1) {
      // La actualización fue exitosa
      // Obtener los nuevos datos del usuario actualizado
      const newUser = await User.findOne({ where: { email: email } });
      const {
        name,
        role,
        telefono,
        email: userEmail,
        token,
        direccion,
        picture,
      } = newUser;
      return res.status(200).json({
        message: "Datos actualizados correctamente",
        name: name,
        role: role,
        token: token,
        email: userEmail,
        telefono: telefono,
        direccion: direccion,
        picture: picture,
      });
    } else {
      // No se pudo actualizar el usuario
      return res
        .status(500)
        .json({ message: "No se pudo actualizar el usuario" });
    }
  } catch (error) {
    console.log("Error en la actualización de datos", error);
    res.status(500).json({ message: "Error en la actualización de datos" });
  }
};

const listarPedidos = async (req, res) => {
  const { email } = req.params;
  console.log(email);
  try {
    const pedidos = await Pedido.findAll({
      include: [
        {
          model: DetallesPedido,
          attributes: ["id"],
          include: [
            {
              model: Productos,
              attributes: ["id", "nombre", "image", "referencia", "valor"],
            },
          ],
        },
        {
          model: User,
          attributes: [],
          where: { email: email },
        },
      ],
      attributes: ["id", "cantidad", "total"],
    });

    res.status(200).json({ pedidos: pedidos });
  } catch (e) {
    console.log("Error al listar pedidos", e);
    res.status(500).json({ message: "Error interno en el servidor" });
  }
};

module.exports = {
  listarProductos,
  listarCategoriaProducto,
  listarOfertas,
  buscarProductos,
  finalizarCompraInvitado,
  finalizarCompraUsuario,
  obtenerDatosUsuario,
  actulizarDatosDeUsuario,
  listarPedidos,
};
