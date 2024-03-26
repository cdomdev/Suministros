import {
  Pedido,
  DetallesPedido,
  Productos,
} from "../../models/inventaryModel.js";
import { Invitado, User } from "../../models/usersModels.js";


export const listarUsuariosConPedidos = async (req, res) => {
  try {
    // Obtener todos los usuarios
    const usuarios = await User.findAll({
      attributes: ["id", "name", "email", "role"],
    });

    // Obtener el número de pedidos para cada usuario y agregar el indicador a la respuesta
    const usuariosConPedidos = await Promise.all(usuarios.map(async (usuario) => {
      const numPedidos = await Pedido.count({
        where: { usuario_id: usuario.id }
      });
      
      // Agregar un indicador al usuario para mostrar si tiene pedidos o no
      return { ...usuario.toJSON(), tienePedidos: numPedidos > 0 };
    }));

    // Enviar la lista de usuarios con el indicador de pedidos en la respuesta
    res.json({ usuarios: usuariosConPedidos });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al obtener usuarios con pedidos" });
  }
};

export const listarInvitadosConPedidos = async (req, res) => {
  try {
    // Obtener todos los usuarios
    const invitados = await Invitado.findAll({
      attributes: ["id", "nombre", "email",],
    });

    // Obtener el número de pedidos para cada usuario y agregar el indicador a la respuesta
    const invitadosConPedidos = await Promise.all(invitados.map(async (invitado) => {
      const numPedidos = await Pedido.count({
        where: { invitado_id: invitado.id }
      });
      
      // Agregar un indicador al usuario para mostrar si tiene pedidos o no
      return { ...invitado.toJSON(), tienePedidos: numPedidos > 0 };
    }));

    // Enviar la lista de usuarios con el indicador de pedidos en la respuesta
    res.json({ invitados: invitadosConPedidos  });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al obtener usuarios con pedidos" });
  }
};

export const listarPedidos = async (req, res) => {
  try {
    const pedidosUsuarios = await Pedido.findAll({
      attributes: ["id", "cantidad", "metodo_pago", "total"],
      include: [
        {
          model: DetallesPedido,
          attributes: [
            "id",
            "precio_unitario",
            "sub_total",
            "descuento",
            "createdAt",
          ],
          include: [
            {
              model: Productos,
              attributes: ["id", "title", "image", "referencia", "valor"],
            },
          ],
        },
        {
          model: User,
          as: "usuario",
          attributes: [
            "id",
            "name",
            "email",
            "telefono",
            "detalles",
            "direccion",
          ],
        },
        {
          model: Invitado,
        },
      ],
    });
    const pedidosInvitados = await Pedido.findAll({
      attributes: ["id", "cantidad", "metodo_pago", "total"],
      include: [
        {
          model: DetallesPedido,
          attributes: [
            "id",
            "precio_unitario",
            "sub_total",
            "descuento",
            "createdAt",
          ],
          include: [
            {
              model: Productos,
              attributes: [
                "id",
                "title",
                "image",
                "referencia",
                "valor",
                "createdAt",
              ],
            },
          ],
        },
        {
          model: Invitado,
          as: "invitado",
        },
      ],
    });
    const pedidos = {
      usuarios: pedidosUsuarios,
      invitador: pedidosInvitados,
    };
    if (!pedidos || pedidos.length === 0) {
      return res.status(400).json({ message: "No se encontraron pedidos" });
    }
    res.status(200).json({ pedidos: pedidos });
  } catch (e) {
    console.log("Error al listar pedidos", e);
    res.status(500).json({ message: "Error interno en el servidor" });
  }
};

export const listarPedidoPorUsuario = async (req, res) => {
  const { id } = req.params;

  try {
    const pedidosPorUsuarios = await Pedido.findAll({
      where: { usuario_id: id },
      attributes: ["id", "cantidad", "metodo_pago", "total"],
      include: [
        {
          model: DetallesPedido,
          attributes: [
            "id",
            "precio_unitario",
            "sub_total",
            "descuento",
            "createdAt",
          ],
          include: [
            {
              model: Productos,
              attributes: ["id", "title", "image", "referencia", "valor"],
            },
          ],
        },
      ],
    });

    if (pedidosPorUsuarios) {
      res.status(200).json({ pedidosPorUsuarios });
    } else {
      res.status(404).json({ message: "El usuario no tiene pedidos" });
    }
  } catch (e) {
    res.status(500).json({ message: "Error en el servidor", e });
    console.log(e);
  }
};
