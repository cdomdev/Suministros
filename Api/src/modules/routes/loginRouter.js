const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginAuth');
const verificarToken = require('../middleware/verificarToken');


router.post('/', loginController);




module.exports = router;