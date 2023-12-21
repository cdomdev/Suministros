const User = require("../models/userRegister");
const {Categoria, Productos} = require('../models/inventaryModel')



const listarUsuarios = async (req, res) => {
  try {
    const usuarios = await User.findAll({attributes: ['id', 'name', 'email', 'role']});

    //Eviar usuarios en la repsuesta
    res.json({ usuarios });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
};


const listarCategorias = async(req, res) =>{
  try{
    const categorias = await Categoria.findAll({attributes: ['id','nombre']})
    res.json({categorias})

  }catch(e){
    console.log(e)
    res.status(500).json({ error: 'Error al obtener las categorias' });
  }
}

const saveImagenServer = (req, res) =>{
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
}

const listarProductos = async(req, res) =>{
  try{
    const productos = await Productos.findAll({attributes: ['id','title', 'valor', 'description', 'image', 'referencia']})
    res.json({productos})
  }catch(e){
    console.log(e)
    res.status(500).json({error: 'Error al obtener los productos'})
  }
}

module.exports = {
  listarUsuarios,
  saveImagenServer,
  listarCategorias,
  listarProductos
};