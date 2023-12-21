const express = require('express');
const cors = require('cors');
const mysql = require('./src/database/conecction');
// const http = require('http');
const app = express();
const morgan = require('morgan')

app.use(morgan('combined'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const port = process.env.PORT || 3100;


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

app.use('/src/modules/uploads/products', express.static('src/modules/uploads/products'));
// para usare el protocolo http 
// const server = http.createServer(app)

app.listen(port, () => {
  console.log(`El servidor se está ejecutando en el puerto ${port}`);
});
