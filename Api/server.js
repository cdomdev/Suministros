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

//  ruta antes del cambio
// const registroRouter = require('./src/modules/routes/registroRoute');
// app.use('/registro', registroRouter);
// const loginRoute = require('./src/modules/routes/loginRouter')
// app.use('/login', loginRoute);

// rutas para usuarios
const usersRoutes = require('./src/modules/routes/rutasUsers')
app.use('/', usersRoutes)
// rutas para administradores 

const adminRoutes = require('./src/modules/routes/rutasAdmin');
app.use('/api', adminRoutes)

// Manejador de errores
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Error interno del servidor' });
});

app.listen(port, () => {
  console.log(`El servidor se está ejecutando en el puerto ${port}`);
});
