const express = require("express");
const cors = require("cors");
const mysql = require("./src/database/conecction");
const morgan = require("morgan");
const app = express();
const port = process.env.PORT || 3100;

app.use(morgan("combined"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


// rutas 
const userRoutes = require("./src/modules/routes/rutasUsers");
app.use("/", userRoutes);

const adminRoutes = require("./src/modules/routes/rutasAdmin");
app.use("/api", adminRoutes);


// direcciones estaticas

app.use(
  "/src/modules/uploads/products",
  express.static("src/modules/uploads/products")
);

app.use(express.static(__dirname + '/public'))


// Manejador de errores
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Error interno del servidor" });
});

app.listen(port, () => {
  console.log(`El servidor se está ejecutando en el puerto ${port}`);
});
