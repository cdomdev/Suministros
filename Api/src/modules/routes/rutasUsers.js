const express = require('express');
const router = express.Router();
const controllerUsers = require('../controllers/user/userController');
const controller = require('../controllers/user/controller')


// autenticacion  y registro
router.post('/login', controllerUsers.loginController);

router.post('/registro',  controllerUsers.registroController);

router.post('/update/password', controllerUsers.recoveryPassword)


// listar productos 
router.get('/listar/productos', controller.listarProductos )

router.get('/categorias/:codigoProducto', controller.listarCategoriaProducto);




module.exports = router;