const {
  Productos,
  Inventario,
  Categoria,
} = require("../../models/inventaryModel");

const listarProductos = async (req, res) => {
  try {
    const productos = await Productos.findAll({
      attributes: [
        "id",
        "title",
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

module.exports = {
  listarProductos,
  listarCategoriaProducto,

};
