import React from "react";
import { VscSearchStop } from "react-icons/vsc";

export const NotProduct = () => {
  return (
    <div className="content-not-products">
      <div className="oops">
        <span>OOOPS!</span><VscSearchStop className="icon" />
      </div>
      <div className="list">
        <h4>No hemos encontrados resultados de tu busqueda</h4>
        <h5>Puedes intentar lo siguiente.</h5>
        <ul>
          <li>Comprueba los términos introducidos.</li>
          <li>Intenta utilizar una sola palabra.</li>
          <li>Utiliza términos genéricos en la búsqueda.</li>
        </ul>
      </div>
    </div>
  );
};
