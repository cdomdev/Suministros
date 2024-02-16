const {
  Productos,
  Inventario,
} = require("../../models/inventaryModel");

const guardarProducto = async (req, res) => {
  try {
    const { productos } = req.body;
    for (const producto of productos) {
      const nuevoProducto = await Productos.create({
        title: producto.title,
        nombre: producto.nombre,
        valor: producto.valor,
        description: producto.description,
        referencia: producto.referencia,
        categoria_Id: producto.categoria_id,
        image: producto.image,
      });
    
      if (!nuevoProducto) {
        return res.status(500).json({ error: "No se pudo crear el producto" });
      }

      const createdInventario = await Inventario.create({
        producto_Id: nuevoProducto.id,
        cantidad: producto.cantidad,
      });

      if (!createdInventario) {
        return res.status(500).json({
          error: "No se pudo crear el inventario asociado al producto",
        });
      }
    }
    return res
      .status(201)
      .json({ message: "Productos guardados exitosamente" });
  } catch (error) {
    console.error("Error al guardar los productos:", error);
    return res
      .status(500)
      .json({ error: "Hubo un problema al procesar la solicitud" });
  }
};

module.exports = {
  guardarProducto,
};
