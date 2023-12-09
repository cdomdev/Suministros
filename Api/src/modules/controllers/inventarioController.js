const Inventario = require("../models/inventaryModel");

const guardarProducto = async (req, res) => {
  try { 
    const { productos } = req.body;

    console.log(`entrada de datos desde el front:  ${JSON.stringify(productos)}`)
    for (const producto of productos) {
      console.log('Datos del producto:', producto);
      console.log('title:', producto.title);
      console.log('Valor:', producto.valor);
      console.log('Descripción:', producto.description);
      console.log('Imagen:', producto.image);
      const nuevoProducto = await Inventario.create({
        title: producto.title,
        valor: producto.valor,
        description: producto.description,
        image: producto.image,
      });

      console.log(`en lace de la imagen ${producto.image}`)

      if (!nuevoProducto) {
        return res.status(500).json({ error: "No se pudo crear el producto" });
      }
    }
    
    return res.status(201).json({ message: "Productos guardados exitosamente" });
  } catch (error) {
    console.error("Error al guardar los productos:", error);
    return res.status(500).json({ error: "Hubo un problema al procesar la solicitud" });
  }
};



module.exports = guardarProducto;



