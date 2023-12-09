const Inventario = require("../models/inventaryModel");

const guardarProducto = async (req, res) => {
  try { 
    const { productos } = req.body;

    console.log(`entrada de datos desde el front ${productos}`)
    
    for(const producto of productos){
      const nuevoProducto = await Inventario.create({
        marca: producto.title,
        valor: producto.valor,
        descripcion: producto.description,
        image: producto.image, 
      });
      console.log(producto.image)

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



