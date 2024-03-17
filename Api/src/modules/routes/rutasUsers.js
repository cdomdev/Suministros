import express from "express";
import {
  buscarProductos,
  listarCategoriaPadre,
  listarCategoriaProducto,
  listarProductos,
} from "../controllers/user/productsController.js";
import {
  finalizarCompraInvitado,
  finalizarCompraUsuario,
} from "../controllers/user/buysControllers.js";
import {
  actulizarDatosDeUsuario,
  obtenerDatosUsuario,
} from "../controllers/user/dataUserController.js";
import { listarPedidos } from "../controllers/user/ordersController.js";
import { listarOfertasConProductos } from "../controllers/user/ofertasController.js";
import {
  googleLogin,
  loginController,
  recoveryPassword,
  registroController,
} from "../controllers/user/auth.js";
// import mercadoPago from "../controllers/user/mercadoPago";

export const routerUser = express.Router();

// autenticacion
routerUser.post("/user/login", loginController);
// resgistro
routerUser.post("/user/registro", registroController);
// autenticacion y regsitro con google
routerUser.post("/user/oauth-google", googleLogin);
// restablecer contraseña
routerUser.post("/user/password/update", recoveryPassword);

// datos de usuario
// perfil
routerUser.get("/user/profile", obtenerDatosUsuario);
// actualizar perfil
routerUser.post("/user/profile/update", actulizarDatosDeUsuario);

// listar productos
routerUser.get("/listar/productos", listarProductos);

// Listar categoria padre con subcategorias
routerUser.get("/categoria-padre/:codigo", listarCategoriaPadre);

// listar productos por categorias
routerUser.get("/categorias/:codigoProducto", listarCategoriaProducto);

// ofertas
routerUser.get("/listar/ofertas", listarOfertasConProductos);
// router.get("/obtener/ofertas", obtenerOfertasConProductos);

// busqueda de prodcutos
routerUser.post("/busqueda-productos", buscarProductos);

// compra

// Finalizar compra invitado
routerUser.post("/finish/buy/invited", finalizarCompraInvitado);
// finalizar compra usuario
routerUser.post("/finish/buy/user", finalizarCompraUsuario);

// ver pedidos
routerUser.get("/user/listar/pedidos/:email", listarPedidos);

routerUser.post("/create-order-mercadopago");

// module.exports = router;
