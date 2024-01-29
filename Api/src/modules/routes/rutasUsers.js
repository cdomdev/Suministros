const express = require('express');
const router = express.Router();
const authUsers = require('../controllers/user/auth');
const controller = require('../controllers/user/controller')



// autenticacion  y registro
router.post('/login', authUsers.loginController);

router.post('/registro',  authUsers.registroController);

router.post('/update/password',authUsers.recoveryPassword)


// listar productos 
router.get('/listar/productos', controller.listarProductos )

router.get('/categorias/:codigoProducto', controller.listarCategoriaProducto);

router.get("/listar/ofertas", controller.listarOfertas);

// busqueda de prodcutos 

router.post('/busqueda-productos', controller.buscarProductos)


module.exports = router;