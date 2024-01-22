import React, { useEffect, useState } from "react";
import axios from "axios";
import { AddToCartProducts } from "./AddToCartProducts";

export const Cards = () => {
  const [productos, setProductos] = useState([]);

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

  return (
    <div className="contenedor-card">
    {productos.map((producto) => (
      <ul key={producto.id} className="card-products">
        <span className="text-ref">Ref: {producto.referencia}</span>
        <img src={producto.image} alt="not found" className="img-products" />
        <div className="contenido-card">
          <span className="title">{producto.title}</span>
          <li className="text">{producto.description}</li>
          <li className="text">
            $ {producto.valor} <span className="unidad">unidad</span>
          </li>
        </div>
        <AddToCartProducts
          producto={producto}
        />
      </ul>
    ))}
  </div>
  );
};
