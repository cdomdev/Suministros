import React from "react";
import { EnvioNormal} from "../envios/EnvioNormal";

export const InfoCarEntrega = () => {
    return (
      <>
        <div className="contendor-infor-car">
          <div className="box1">
            <span className="carrito-text">Escoge tus opciones de entrega</span>
          </div>
          <div className="box-entrega">
            <div className="delivery-program">
              <EnvioNormal  />
            </div>
          </div>
        </div>
      </>
    );
  };