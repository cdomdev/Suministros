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
  obtenerDatosUsuario,
  listarOfertas,
  listarProductos,
  actulizarDatosDeUsuario,
  listarPedidos
} = require("../controllers/user/controller");

// autenticacion 
router.post("/user/login", loginController);
// resgistro
router.post("/user/registro", registroController);
// autenticacion y regsitro con google
router.post("/user/oauth-google", googleLogin);
// restablecer contraseña
router.post("/user/password/update", recoveryPassword);


// datos de usuario 
// perfil
router.get('/user/profile', obtenerDatosUsuario)
// actualizar perfil
router.post('/user/profile/update', actulizarDatosDeUsuario)


// listar productos
router.get("/listar/productos", listarProductos);
// lisatar productos por categorias
router.get("/categorias/:codigoProducto", listarCategoriaProducto);
// ofertas
router.get("/listar/ofertas", listarOfertas);
// router.get("/obtener/ofertas", obtenerOfertasConProductos);

// busqueda de prodcutos
router.post("/busqueda-productos", buscarProductos);

// compra

// Finalizar compra invitado
router.post("/finish/buy/invited", finalizarCompraInvitado);
// finalizar compra usuario
router.post("/finish/buy/user", finalizarCompraUsuario);


// ver pedidos
router.get('/user/listar/pedidos/:email', listarPedidos)



module.exports = router;
