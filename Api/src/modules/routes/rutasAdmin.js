const express = require("express");
const router = express.Router();
const {
  guardarProducto,
} = require("../controllers/admin/inventarioController");
const upload = require("../utils/imageUpload");
const {
  actualizarProducto,
  actulizarInventario,
  eliminarProductos,
  listarProductos,
  listarUsuarios,
  saveImagenServer,
  listarPedidos
} = require("../controllers/admin/adminController");
const {
  actulizarOfertas,
  crearOfetas,
  eliminarOferta,
  obtenerOfertasConProductos,
  obtenerProductos,
} = require("../controllers/admin/ofertasControler");
const {
  crearCategoriasPrincipales,
  crearCategorias,
  eliminarCategoria,
  eliminarCategoriaPrincipal,
  listarCategorias,
  listarCategoriasPrincipales,
} = require("../controllers/admin/categorias");

// productos

router.post("/guardarproductos", guardarProducto);

router.post("/upload", upload.array("files"), saveImagenServer);

// usuarios
router.get("/listar/usuarios", listarUsuarios);

// categorias
router.post("/crear/categoria-primary", crearCategoriasPrincipales);

router.get("/obtener/categorias-primary", listarCategoriasPrincipales);

router.delete("/delete/:id/categorias-primary", eliminarCategoriaPrincipal);

// subcategorias
router.post("/crear/categoria", crearCategorias);

router.get("/obtener/categorias", listarCategorias);

router.delete("/categorias/:id/eliminar", eliminarCategoria);

// inventario
router.get("/listar/productos", listarProductos);

router.put("/productos/:id/inventario", actulizarInventario);

router.put("/productos/:id/actualizar", actualizarProducto);

router.delete("/productos/:id/eliminar", eliminarProductos);

// ofertas

router.get("/productos", obtenerProductos);

router.post("/crear/ofertas", crearOfetas);

router.get("/listar/ofertas", obtenerOfertasConProductos);

router.delete("/oferta/:id/eliminar", eliminarOferta);

router.put("/oferta/:id/actualizar", actulizarOfertas);


// listar pedido

router.get('/listar/pedidos', listarPedidos)


module.exports = router;
