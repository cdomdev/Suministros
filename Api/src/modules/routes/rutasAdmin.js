const express = require("express");
const router = express.Router();
const controllerInvenatirio = require("../controllers/inventarioController");
const upload = require("../utils/imageUpload");
const controllerAdmin = require("../controllers/adminController");
const controaldorOfertas = require("../controllers/ofertasControler");


// productos

router.post("/guardarproductos", controllerInvenatirio.guardarProducto);

router.post("/upload", upload.array("files"), controllerAdmin.saveImagenServer);

// usuarios
router.get("/listar/usuarios", controllerAdmin.listarUsuarios);

// categorias
router.post("/crear/categoria", controllerInvenatirio.crearCategorias);

router.get("/obtener/categorias", controllerAdmin.listarCategorias);

router.delete("/categorias/:id/eliminar", controllerAdmin.eliminarCategoria);

// inventario
router.get("/listar/productos", controllerAdmin.listarProductos);

router.put("/productos/:id/inventario", controllerAdmin.actulizarInventario);

router.put("/productos/:id/actualizar", controllerAdmin.actualizarProducto);

router.delete("/productos/:id/eliminar", controllerAdmin.eliminarProductos);

// ofertas

router.get("/productos", controaldorOfertas.obtenerProductos);

router.post("/crear/ofertas", controaldorOfertas.crearOfetas);

router.get("/listar/ofertas", controaldorOfertas.obtenerOfertasConProductos);

router.delete("/oferta/:id/eliminar", controaldorOfertas.eliminarOferta);

router.put('/oferta/:id/actualizar', controaldorOfertas.actulizarOfertas)
module.exports = router;
