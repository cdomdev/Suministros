const {
  Productos,
  Inventario,
  Categoria,
  Ofertas,
} = require("../../models/inventaryModel");
const Sequelize = require("sequelize");
const { Pedido, Invitado, DetallesPedido } = require("../../models/usersModels");
const {calcularCantidad, calcularTotal, subTotal} = require('../../utils/valoresDeProductos')

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

    if(!nuevoPedido){
      return res.status(500).json({message: 'Error al crear el pedido'})
    }

    // crear detalles del pédido
    for(const producto of dataProducts){
      console.log('detalles del producto',producto)
      console.log('detalles del producto',producto.valor)
      console.log('detalles del producto',producto.cantidad)
      await DetallesPedido.create({
        pedido_id: nuevoPedido.id,
        producto_id: producto.id,
        cantidad: calcularCantidad(dataProducts),
        precio_unitario: producto.valor,
        sub_total: subTotal(dataProducts),
        descuento: 0
      })
    }

    // enviar respuesta de la solcitud

    return res.status(200).json({message: 'Compra realzida con exito'})
  } catch (e) {
    console.log('Error al finalizar la compra', e);
    return res.status(500).json({message: 'Error interno en el servidor'})
  }
};



const finalizarCompraUsuario = (req, res) => {
  const {} = req.body;
  // validacion de datos

  // crear pedido

  // crear detalles del pédido

  // actilizar stock de inventario

  // guardar datos

  // enviar respuesta de la solcitud
};

module.exports = {
  listarProductos,
  listarCategoriaProducto,
  listarOfertas,
  buscarProductos,
  finalizarCompraInvitado,
  finalizarCompraUsuario,
};
