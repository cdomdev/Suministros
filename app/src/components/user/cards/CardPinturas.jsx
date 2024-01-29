
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

export const CardPinturas  = () => {
  const [productos, setProductos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/categorias/pinturas")
      .then((response) => {
        if (response.status === 200) {
          const dataProducto = response.data.categoria.Productos;
          setProductos(dataProducto);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function navigateDetail(producto) {
    localStorage.setItem("selectedProduct", JSON.stringify(producto));
    localStorage.setItem("categroyselectedProduct", JSON.stringify(productos));
    navigate(`/suministros/details/${producto.description}`);
  }

  return (
    <div className="contenedor-card">
      {productos.length === 0 ? (
        <p>No hay productos disponibles...</p>
      ) : (
        <>
          {productos.map((producto) => (
            <ul key={producto.id} className="card-products">
              <span className="text-ref">REF: {producto.referencia}</span>
              <img
                src={producto.image}
                alt="not found"
                className="img-products"
              />
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
        </>
      )}
    </div>
  );
};
