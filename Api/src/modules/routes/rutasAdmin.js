import { imageUpload } from "../utils/imageUpload.js";
import {
  guardarProducto,
  saveImagenServer,
} from "../controllers/admin/adminController.js";
import {
  listarPedidos,
  listarPedidoPorUsuario,
  listarUsuariosConPedidos,
  listarInvitadosConPedidos
} from "../controllers/admin/pedidosController.js";
import {
  actualizarProducto,
  actulizarInventario,
  eliminarProductos,
  listarProductos,
} from "../controllers/admin/inventarioController.js";
import {
  actulizarOfertas,
  crearOfetas,
  eliminarOferta,
  obtenerOfertasConProductos,
  obtenerProductos,
} from "../controllers/admin/ofertasControler.js";
import {
  crearCategorias,
  crearCategoriasPrincipales,
  eliminarCategoria,
  eliminarCategoriaPrincipal,
  listarCategorias,
  listarCategoriasPrincipales,
} from "../controllers/admin/categorias.js";

import express from "express";

export const routerAdmin = express.Router();

// productos guardar
routerAdmin.post("/guardarproductos", guardarProducto);

routerAdmin.post("/upload", imageUpload.array("files"), saveImagenServer);

// usuarios

// categorias
routerAdmin.post("/crear/categoria-primary", crearCategoriasPrincipales);

routerAdmin.get("/obtener/categorias-primary", listarCategoriasPrincipales);

routerAdmin.delete(
  "/delete/:id/categorias-primary",
  eliminarCategoriaPrincipal
);

// subcategorias
routerAdmin.post("/crear/categoria", crearCategorias);

routerAdmin.get("/obtener/categorias", listarCategorias);

routerAdmin.delete("/categorias/:id/eliminar", eliminarCategoria);

// inventario

routerAdmin.get("/listar/productos", listarProductos);

routerAdmin.put("/productos/:id/inventario", actulizarInventario);

routerAdmin.put("/productos/:id/actualizar", actualizarProducto);

routerAdmin.delete("/productos/:id/eliminar", eliminarProductos);

// ofertas

routerAdmin.get("/productos", obtenerProductos);

routerAdmin.post("/crear/ofertas", crearOfetas);

routerAdmin.get("/listar/ofertas", obtenerOfertasConProductos);

routerAdmin.delete("/oferta/:id/eliminar", eliminarOferta);

routerAdmin.put("/oferta/:id/actualizar", actulizarOfertas);

// listar pedido

routerAdmin.get("/listar/usuarios", listarUsuariosConPedidos);
routerAdmin.get("/listar/invitados", listarInvitadosConPedidos);
routerAdmin.get("/listar/pedidos", listarPedidos);
routerAdmin.get("/listar/pedidos-usuario/:id", listarPedidoPorUsuario);
