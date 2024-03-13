const express = require("express");
const router = express.Router();
const productsController = require("../controllers/user/productsController");
const buysControllers = require('../controllers/user/buysControllers')
const dataUserController = require('../controllers/user/dataUserController')
const ordersController = require('../controllers/user/ordersController')
const ofertasControler = require('../controllers/user/ofertasController')
const auth = require('../controllers/user/auth')

// autenticacion 
router.post("/user/login", auth.loginController);
// resgistro
router.post("/user/registro", auth.registroController);
// autenticacion y regsitro con google
router.post("/user/oauth-google", auth.googleLogin);
// restablecer contraseña
router.post("/user/password/update", auth.recoveryPassword);


// datos de usuario 
// perfil
router.get('/user/profile', dataUserController.obtenerDatosUsuario)
// actualizar perfil
router.post('/user/profile/update', dataUserController.actulizarDatosDeUsuario)


// listar productos
router.get("/listar/productos", productsController.listarProductos);


// Listar categoria padre con subcategorias 
router.get('/categoria-padre/:codigo', productsController.listarCategoriaPadre)

// listar productos por categorias
router.get("/categorias/:codigoProducto", productsController.listarCategoriaProducto);


// ofertas
router.get("/listar/ofertas", ofertasControler.listarOfertasConProductos);
// router.get("/obtener/ofertas", obtenerOfertasConProductos);

// busqueda de prodcutos
router.post("/busqueda-productos", productsController.buscarProductos);

// compra

// Finalizar compra invitado
router.post("/finish/buy/invited", buysControllers.finalizarCompraInvitado);
// finalizar compra usuario
router.post("/finish/buy/user", buysControllers.finalizarCompraUsuario);


// ver pedidos
router.get('/user/listar/pedidos/:email', ordersController.listarPedidos)



module.exports = router;
