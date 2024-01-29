const {
  Productos,
  Inventario,
  Categoria,
  Ofertas,
} = require("../../models/inventaryModel");
const Sequelize = require('sequelize')

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


const listarOfertas = async(req, res) =>{
  try {
    const response = Ofertas.findAll()
    if(response){
      res.json({ categoria: response });
    }
  } catch (e) {
    console.error(e);
    res
      .status(500)
      .json({ error: "Error al obtener las ofertas" });
  }
}

const buscarProductos = (req, res) => {
  const { query } = req.body;

  // Realizar la búsqueda
  Productos.findAll({
    where: {
      nombre: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('nombre')), 'LIKE', `%${query.toLowerCase()}%`)
    }
  })
  .then(resultados => {
    if (resultados && resultados.length > 0) {
      return res.status(200).json({ message: "Productos encontrados", resultados: resultados });
    } else {
      return res.status(404).json({ message: "No se encontraron productos para la búsqueda proporcionada" });
    }
  })
  .catch(err => {
    return res.status(500).json({ message: "Error en el servidor al buscar productos", error: err });
  });
};





module.exports = {
  listarProductos,
  listarCategoriaProducto,
  listarOfertas,
  buscarProductos
};
