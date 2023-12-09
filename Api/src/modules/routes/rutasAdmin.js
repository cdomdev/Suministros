const express = require('express');
const router = express.Router();
const guardarProducto = require('../controllers/inventarioController');
const upload = require('../utils/imageUpload')

// Ruta para guardar productos
router.post('/guardarproductos', guardarProducto);

router.post('/upload', upload.array('files'), (req, res) => {
    try {
      if (!req.files || req.files.length === 0) {
        return res.status(400).send('Por favor, sube una o más imágenes');
      }
      const uploadedFiles = req.files.map(file => {
         // Modifica la URL base según tu estructura
        const imageUrl = `https://localhost:3000/src/modules/uploads/products/${file.filename}`;
        return {
          originalName: file.originalname,
          imageUrl: imageUrl
        };
      });
  
      res.status(200).json({ uploadedFiles: uploadedFiles });
    } catch (error) {
      console.error('Error al subir las imágenes:', error);
      res.status(500).send('Error al subir las imágenes');
    }
  });
  

module.exports = router;
