const express = require("express");
const router = express.Router();
const controllerProductos = require("../controllers/admin/inventarioController");
const upload = require("../utils/imageUpload");
const controllerAdmin = require("../controllers/admin/adminController");
const controladorOfertas = require("../controllers/admin/ofertasControler");
const controllerCategorias = require('../controllers/admin/categorias')

// productos

router.post("/guardarproductos", controllerProductos.guardarProducto);

router.post("/upload", upload.array("files"), controllerAdmin.saveImagenServer);

// usuarios
router.get("/listar/usuarios", controllerAdmin.listarUsuarios);

// categorias

router.post("/crear/categoria", controllerCategorias.crearCategorias);

router.get("/obtener/categorias", controllerCategorias.listarCategorias);

router.delete("/categorias/:id/eliminar", controllerCategorias.eliminarCategoria);

// inventario
router.get("/listar/productos", controllerAdmin.listarProductos);

router.put("/productos/:id/inventario", controllerAdmin.actulizarInventario);

router.put("/productos/:id/actualizar", controllerAdmin.actualizarProducto);

router.delete("/productos/:id/eliminar", controllerAdmin.eliminarProductos);

// ofertas

router.get("/productos", controladorOfertas.obtenerProductos);

router.post("/crear/ofertas", controladorOfertas.crearOfetas);

router.get("/listar/ofertas", controladorOfertas.obtenerOfertasConProductos);

router.delete("/oferta/:id/eliminar", controladorOfertas.eliminarOferta);

router.put('/oferta/:id/actualizar', controladorOfertas.actulizarOfertas)
module.exports = router;
