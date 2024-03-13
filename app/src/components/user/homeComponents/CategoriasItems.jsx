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
        <div>
          <Link to={"/suministros/baños"}>
            <img src={baños} alt="baños" />
            <span>Baños</span>
          </Link>
        </div>
        <div>
          <Link to={"/suministros/cocinas"}>
            <img src={cocinas} alt="cocinas" />
            <span>cocinas</span>
          </Link>
        </div>
        <div>
          <Link to={"/suministros/construccion-remodelacion"}>
            <img src={constr} alt="const" />
            <span>construccion y remodelacion</span>
          </Link>
        </div>
        <div>
          <Link to={"/suministros/pisos-paredes"}>
            <img src={pisos} alt="psiso" />
            <span>Pisos y paredes</span>
          </Link>
        </div>
      </div>
    </>
  );
};
