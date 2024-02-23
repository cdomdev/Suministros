const express = require("express");
const router = express.Router();
const {
  googleLogin,
  loginController,
  recoveryPassword,
  registroController,
} = require("../controllers/user/auth");
const {
  buscarProductos,
  finalizarCompraInvitado,
  finalizarCompraUsuario,
  listarCategoriaProducto,
  listarOfertas,
  listarProductos,
  obtenerOfertasConProductos
} = require("../controllers/user/controller");

// autenticacion  y registro
router.post("/login", loginController);

router.post("/registro", registroController);

router.post("/oauth-google", googleLogin);

router.post("/update/password", recoveryPassword);

// listar productos
router.get("/listar/productos", listarProductos);

router.get("/categorias/:codigoProducto", listarCategoriaProducto);

router.get("/listar/ofertas", listarOfertas);

// busqueda de prodcutos

router.post("/busqueda-productos", buscarProductos);

// compra
router.post("/finish/buy/invited", finalizarCompraInvitado);

router.post("/finish/buy/user", finalizarCompraUsuario);

router.get("/obtener/ofertas", obtenerOfertasConProductos);

module.exports = router;
