const User = require("../../models/usersModels");
const {
  Categoria,
  Productos,
  Inventario,
} = require("../../models/inventaryModel");


const listarUsuarios = async (req, res) => {
  try {
    const usuarios = await User.findAll({
      attributes: ["id", "name", "email", "role"],
    });

    //Eviar usuarios en la repsuesta
    res.json({ usuarios });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
};

const saveImagenServer = (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).send("Por favor, sube una o más imágenes");
    }
    const uploadedFiles = req.files.map((file) => {
      // Modifica la URL base según tu estructura
      const imageUrl = `http://localhost:3000/src/modules/uploads/products/${file.filename}`;
      return {
        originalName: file.originalname,
        imageUrl: imageUrl,
      };
    });

    res.status(200).json({ uploadedFiles: uploadedFiles });
  } catch (error) {
    console.error("Error al subir las imágenes:", error);
    res.status(500).send("Error al subir las imágenes");
  }
};

const listarProductos = async (req, res) => {
  try {
    const productos = await Productos.findAll({
      attributes: [
        "id",
        "nombre",
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
    res.json({ productos });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Error al obtener los productos" });
  }
};

const actulizarInventario = async (req, res) => {
  const { producto_Id, newStock } = req.body;

  try {
    // BUcar el registro en la db
    const inventario = await Inventario.findOne({ where: { producto_Id } });
    if (inventario) {
      // actualizar la cantidad en el inventario
      await Inventario.update(
        { cantidad: newStock },
        { where: { producto_Id: producto_Id } }
      );
      const inventaryUpdate = await Productos.findAll({
        attributes: [
          "id",
          "nombre",
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

      return res.status(200).json({
        message: "Cantidad en el inventario actualizada exitosamente.",
        inventaryUpdate,
      });
    } else {
      return res.status(404).json({
        message: "No se encontró el registro de inventario para el producto.",
      });
    }
  } catch (error) {
    console.log(error);
    console.error("Error al actualizar la cantidad en el inventario:", error);
    return res.status(500).json({
      error: "Hubo un error al actualizar la cantidad en el inventario.",
    });
  }
};

const actualizarProducto = async (req, res) => {
  const { producto_Id, newProduct } = req.body;
  const { nombre,title, valor, description, referencia, categoria_Id } = newProduct;

  try {
    const productos = await Productos.findOne({ where: { id: producto_Id } });
    if (productos) {
      await Productos.update(
        { nombre, title, valor, description, referencia, categoria_Id },
        { where: { id: producto_Id } }
      );
      const productosUpdate = await Productos.findAll({
        attributes: [
          "id",
          "nombre",
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
      return res.status(200).json({
        message: "Producto atualizado exitosamente.",
        productosUpdate,
      });
    } else {
      return res.status(404).json({
        message: "No se encontró el registro producto.",
      });
    }
  } catch (error) {
    console.log(error);
    console.log("Error interno del servidor", error);
    return res.status(500).json({
      error: "Hubo un error al actualizar la cantidad en el inventario.",
    });
  }
};

const eliminarProductos = async (req, res) => {
  const { producto_Id } = req.body;

  try {
    // Eliminar el producto por su ID
    const productoEliminado = await Productos.destroy({
      where: { id: producto_Id },
    });

    if (!productoEliminado) {
      return res
        .status(404)
        .json({ message: "No se pudo encontrar el producto" });
    }
    // Eliminar la cantidad en inventario relacionada al producto
    const inventarioEliminado = await Inventario.destroy({
      where: { producto_Id: producto_Id },
    });
    if (!inventarioEliminado) {
      return res
        .status(500)
        .json({ message: "Error al eliminar la cantidad en inventario" });
    }

    const daleteUpdate = await Productos.findAll({
      attributes: [
        "id",
        "nombre",
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

    // Si ambos borrados fueron exitosos
    return res.status(200).json({
      message: "Producto y cantidad en inventario eliminados con éxito",
      daleteUpdate,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error:
        "Hubo un error al intentar eliminar el producto y su cantidad en inventario.",
    });
  }
};


module.exports = {
  listarUsuarios,
  saveImagenServer,
  listarProductos,
  actulizarInventario,
  actualizarProducto,
  eliminarProductos,
};
