import React, {useState, useEffect} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

export const CardParedes = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/categorias/paredes")
      .then((response) => {
        if (response.status === 200) {
          setProductos(response.data.categoria.Productos);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  
  function navigateDetail (producto){
    localStorage.setItem('selectedProduct', JSON.stringify(producto))
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
