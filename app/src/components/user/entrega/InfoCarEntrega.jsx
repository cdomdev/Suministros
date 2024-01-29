import React, { useState, useEffect } from "react";
import { EnvioInvitado } from "../envios/EnvioInvitado";
import { EnvioUser } from "../envios/EnvioUser";
import { isAuthenticated } from "../../../auth/Auth";

export const InfoCarEntrega = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated());

  useEffect(() => {
    setIsLoggedIn(isAuthenticated());
  }, [isLoggedIn]);

  return (
    <>
      <div className="contendor-infor-car">
        <div className="box1">
          <span className="carrito-text">Escoge tus opciones de entrega</span>
        </div>
        <div className="box-entrega">
          <div className="delivery-program">
            {isLoggedIn ? <EnvioUser /> : <EnvioInvitado />}
          </div>
        </div>
      </div>
    </>
  );
};
