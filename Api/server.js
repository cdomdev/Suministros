const express = require('express');
const cors = require('cors');
const mysql = require('./src/database/conecction');
const app = express();
const morgan = require('morgan')
const upload = require('./src/modules/utils/imageUpload')

app.use(morgan('combined'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const port = process.env.PORT || 3100;

// rutas para usuarios 
const registroRouter = require('./src/modules/routes/registroRoute');
app.use('/registro', registroRouter);

const loginRoute = require('./src/modules/routes/loginRouter')
app.use('/login', loginRoute);


// rutas para administradores 

const inventarioRoute = require('./src/modules/routes/rutasAdmin');
app.use('/api', inventarioRoute)

// Manejador de errores
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Error interno del servidor' });
});

app.listen(port, () => {
  console.log(`El servidor se está ejecutando en el puerto ${port}`);
});
