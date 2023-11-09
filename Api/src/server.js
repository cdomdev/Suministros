const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser'); // Importa body-parser
const mysql = require('./database/conecction');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// rutas

// Importa la ruta de registro
const registroRouter = require('./users/routes/registroRoute');
app.use('/registro', registroRouter);



const loginRuter = require('./users/routes/loginRouter');
app.use('/api/login', loginRuter);



// Manejador de errores
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Error interno del servidor' });
});

app.listen(port, () => {
  console.log(`El servidor se está ejecutando en el puerto ${port}`);
});
