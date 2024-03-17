import {
  Pedido,
  DetallesPedido,
  Productos,
} from "../../models/inventaryModel.js";
import  { User } from "../../models/usersModels.js";

// controlador para listado de pediudos usuarios

export const listarPedidos = async (req, res) => {
  const { email } = req.params;
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

// module.exports = {
//   listarPedidos,
// };
