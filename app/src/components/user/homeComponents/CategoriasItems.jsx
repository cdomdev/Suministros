import React from "react";
import baños from "../../../assets/images/baños.webp";
import cocinas from "../../../assets/images/cocinas.webp";
import constr from "../../../assets/images/constr.webp";
import pisos from "../../../assets/images/pisos.webp";
import { Link } from "react-router-dom";



export const CategoriasCards = () => {
  return (
    <>
      <div className="card-categorias">
        <Link to={"/suministros/baños"}>
          <div>
            <img src={baños} alt="baños" />
            <span>Baños</span>
          </div>
        </Link>
        <Link to={"/suministros/cocinas"}>
          <div>
            <img src={cocinas} alt="cocinas" />
            <span>cocinas</span>
          </div>
        </Link>
        <Link to={"/suministros/construccionyremodelacion"}>
          <div>
            <img src={constr} alt="const" />
            <span>construccion y remodelacion</span>
          </div>
        </Link>
        <Link to={"/suministros/pisosyparedes"}>
          <div>
            <img src={pisos} alt="psiso" />
            <span>Pisos y paredes</span>
          </div>
        </Link>
      </div>
    </>
  );
};
