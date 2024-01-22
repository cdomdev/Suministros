const { Categoria } = require("../../models/inventaryModel");

const generateCodigo = require('../../middleware/generateCodigo')
// Controlador para  categorias

const crearCategorias = async (req, res) => {
  try {
    // extraer elemntos
    if (req) {
      const { nombre } = req.body;
      // genera codigo para categoria 

      const codigo = generateCodigo(nombre)
      // crear nueva categoria en la db
      const nuevaCategoria = await Categoria.create({ nombre, codigo});

      // retornar las categorias
      const categorias = await Categoria.findAll({
        attributes: ["id", "nombre"],
      });
      if (categorias) {
        res.status(201).json({
          mensaje: "Categoria creada exitosamente",
          categorias: categorias,
        });
      }
    }
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({
        mensaje: "Huno un problema al crear la categoria",
        error: error,
      });
  }
};

const listarCategorias = async (req, res) => {
  try {
    const categorias = await Categoria.findAll({
      attributes: ["id", "nombre"],
    });
    res.json({ categorias: categorias });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Error al obtener las categorias" });
  }
};

const eliminarCategoria = async (req, res) => {
  const { id } = req.body;

  try {
    const categoriaEliminada = await Categoria.destroy({ where: { id: id } });

    if (categoriaEliminada) {
      const categorias = await Categoria.findAll({
        attributes: ["id", "nombre"],
      });
      return res
        .status(200)
        .json({ message: "Categoría eliminada exitosamente", categorias });
    } else {
      return res
        .status(404)
        .json({ message: "No se encontró la categoría a eliminar" });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Error al intentar eliminar la categoría" });
  }
};

module.exports = {
  listarCategorias,
  eliminarCategoria,
  crearCategorias,
};
