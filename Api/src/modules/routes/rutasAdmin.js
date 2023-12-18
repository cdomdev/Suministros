const express = require("express");
const router = express.Router();
const controllerInvenatirio = require("../controllers/inventarioController");
const upload = require("../utils/imageUpload");
const controllerAdmin = require("../controllers/adminController");

// Ruta para guardar productos
router.post("/guardarproductos", controllerInvenatirio.guardarProducto);

router.post("/upload", upload.array("files"), controllerAdmin.saveImagenServer );

router.get("/listar/usuarios", controllerAdmin.listarUsuarios);

router.post('/crear-categoria',controllerInvenatirio.crearCategorias)

router.get('/obtener-categorias', controllerAdmin.listarCategorias );



module.exports = router;
