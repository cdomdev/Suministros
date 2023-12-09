// routes/registro.js
const express = require('express');
const router = express.Router();
const registroController = require('../controllers/userController');

router.post('/', registroController);

module.exports = router;