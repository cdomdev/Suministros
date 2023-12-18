const express = require('express');
const router = express.Router();
const controllerUsers = require('../controllers/userController');


router.post('/login', controllerUsers.loginController);

router.post('/registro',  controllerUsers.registroController);

module.exports = router;