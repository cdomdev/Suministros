import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

export const Cards = ({ categoriaSeleccionada }) => {
  const [productos, setProductos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/listar/productos")
      .then((response) => {
        if (response.status === 200) {
          setProductos(response.data.productos);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function navigateDetail(producto) {
    localStorage.setItem("selectedProduct", JSON.stringify(producto));
    navigate(`/suministros/details/${producto.description}`);
  }


  const productosFiltrados = categoriaSeleccionada
  ? productos.filter(
    (producto) => producto.Categorium.nombre === categoriaSeleccionada
    )
  : productos;
 

  return (
    <div className="contenedor-card">
      {productosFiltrados.map((producto) => (
        <ul key={producto.id} className="card-products">
          <span className="text-ref">REF: {producto.referencia}</span>
          <img src={producto.image} alt="not found" className="img-products" />
          <div className="contenido-card">
            <li className="title">{producto.title}</li>
            <li className="text">{producto.nombre}</li>
            <li className="valor">
              $ {producto.valor} <span className="unidad">* UN</span>
            </li>
          </div>
          <Link to={`/suministros/details/${producto.nombre}`}>
            <Button onClick={() => navigateDetail(producto)}>
              Ver producto
            </Button>
          </Link>
        </ul>
      ))}
    </div>
  );
};
