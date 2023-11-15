const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser'); // Importa body-parser
const mysql = require('./src/database/conecction');
const app = express();
const port = process.env.PORT || 3100;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// rutas
const registroRouter = require('./src/users/routes/registroRoute');
app.use('/registro', registroRouter);


const loginRoute = require('./src/users/routes/loginRouter')
app.use('/api', loginRoute);


// Manejador de errores
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Error interno del servidor' });
});

app.listen(port, () => {
  console.log(`El servidor se está ejecutando en el puerto ${port}`);
});
