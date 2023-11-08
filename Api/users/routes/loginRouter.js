const express = require('express');
const router = express.Router();
const loginController = require('../controladores/loginContoller'); 

// ruta del login
router.post('/login', loginController.loginController);

module.exports = router;