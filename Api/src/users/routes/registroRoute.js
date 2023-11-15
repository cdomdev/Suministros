// routes/registro.js
const express = require('express');
const router = express.Router();
const registroController = require('../controllers/loginAuth');

router.post('/', registroController);

module.exports = router;