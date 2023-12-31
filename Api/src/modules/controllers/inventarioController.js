const {
  Productos,
  Inventario,
  Categoria,
} = require("../models/inventaryModel");

const guardarProducto = async (req, res) => {
  try {
    const { productos } = req.body;
    for (const producto of productos) {
      const nuevoProducto = await Productos.create({
        title: producto.title,
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

// Controlador para crear categorias

const crearCategorias = async (req, res) => {
  try {
    // extraer elemntos
    if (req) {
      const { nombre } = req.body;
      // crear nueva categoria en la db
      const nuevaCategoria = await Categoria.create({ nombre });
      res.status(201).json({
        mensaje: "Categoria creada exitosamente",
        categoria: nuevaCategoria,
      });
    }
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ mensaje: "Huno un problema al crear la categoria", error: error });
  }
};

module.exports = {
  guardarProducto,
  crearCategorias,
};
