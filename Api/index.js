const express = require('express');
const cors = require('cors');
const mysql = require('./database/conecction');
const app = express()
const port = 3000;
app.use(cors());
app.use(express.json())





app.listen(port, () => {
    console.log(`El servidor se está ejecutando en el puerto ${port}`);
});
