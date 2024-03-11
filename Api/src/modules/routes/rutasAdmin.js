const express = require("express");
const router = express.Router();
const upload = require("../utils/imageUpload");
const adminController = require("../controllers/admin/adminController");
const ofertasController = require("../controllers/admin/ofertasControler");
const categoriasController = require("../controllers/admin/categorias");
const {
  guardarProducto,
} = require("../controllers/admin/inventarioController");

// productos

router.post("/guardarproductos", guardarProducto);

router.post("/upload", upload.array("files"), adminController.saveImagenServer);

// usuarios
router.get("/listar/usuarios", adminController.listarUsuarios);

// categorias
router.post(
  "/crear/categoria-primary",
  categoriasController.crearCategoriasPrincipales
);

router.get(
  "/obtener/categorias-primary",
  categoriasController.crearCategoriasPrincipales
);

router.delete(
  "/delete/:id/categorias-primary",
  categoriasController.eliminarCategoriaPrincipal
);

// subcategorias
router.post("/crear/categoria", categoriasController.crearCategorias);

router.get("/obtener/categorias", categoriasController.listarCategorias);

router.delete(
  "/categorias/:id/eliminar",
  categoriasController.eliminarCategoria
);

// inventario
router.get("/listar/productos", adminController.listarProductos);

router.put("/productos/:id/inventario", adminController.actulizarInventario);

router.put("/productos/:id/actualizar", adminController.actualizarProducto);

router.delete("/productos/:id/eliminar", adminController.eliminarProductos);

// ofertas

router.get("/productos", ofertasController.obtenerProductos);

router.post("/crear/ofertas", ofertasController.crearOfetas);

router.get("/listar/ofertas", ofertasController.obtenerOfertasConProductos);

router.delete("/oferta/:id/eliminar", ofertasController.eliminarOferta);

router.put("/oferta/:id/actualizar", ofertasController.actulizarOfertas);

// listar pedido

router.get("/listar/pedidos", adminController.listarPedidos);

module.exports = router;
