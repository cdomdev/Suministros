import React, { useEffect, useState } from "react";
import axios from "axios";
import { AddToCartProducts } from "./AddToCartProducts";

export const CardPegantes = () => {
  const [pegantes, setPegantes] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/categorias/pegantes")
      .then((response) => {
        if (response.status === 200) {
          setPegantes(response.data.categoria.Productos);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <ul className="card-products">
      {pegantes.map((producto) => (
        <div key={producto.id} className="card">
          <span className="ref-product">Ref: {producto.referencia}</span>
          <div className="contenido-card">
            <img src={producto.image} alt="img" className="img-pintura" />
            <h4 className="title">{producto.title}</h4>
            <li className="text">{producto.description}</li>
            <li className="text"> valor: $ {producto.valor}</li>
            <AddToCartProducts producto={producto}/>
          </div>
        </div>
      ))}
    </ul>
  );
};
