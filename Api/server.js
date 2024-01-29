const express = require("express");
const cors = require("cors");
const mysql = require("./src/database/conecction");
const morgan = require("morgan");
const app = express();


// // configuracion de redis 
// const session = require('express-session');
// const redisClient = require('./redis/redisClient')
// const connectRedis = require('connect-redis');
// const RedisStore = connectRedis(session);
// const secret = process.env.SECRET_REDIS


const port = process.env.PORT || 3100;


app.use(morgan("combined"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// configuracion de midelware de redis 
/**
 app.use(session({
  store: new RedisStore({ client: redisClient }),
  secret: secret,
  resave: false,
  saveUninitialized: false,
  cookie: {secure: false}
}))

 */


// rutas para usuarios
const userRoutes = require("./src/modules/routes/rutasUsers");
app.use("/", userRoutes);
// rutas para administradores

const adminRoutes = require("./src/modules/routes/rutasAdmin");
app.use("/api", adminRoutes);

// Manejador de errores
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Error interno del servidor" });
});

app.use(
  "/src/modules/uploads/products",
  express.static("src/modules/uploads/products")
);


app.listen(port, () => {
  console.log(`El servidor se está ejecutando en el puerto ${port}`);
});
