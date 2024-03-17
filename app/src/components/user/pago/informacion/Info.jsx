import React, { useEffect, useState } from "react";
import { DataUser } from "./DataUser";
import { MercadoPago, PagoUser, PagoInvitado } from "../MetodosDePago";
import { FaHandHoldingDollar } from "react-icons/fa6";
import { isAuthenticated } from "../../../../auth";

export const Info = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated());

  useEffect(() => {
    setIsLoggedIn(isAuthenticated());
  }, [isLoggedIn]);

  return (
    <>
      <div className="box1">
        <h3>Ya casi es tuya</h3>
      </div>
      <div className="box2">
        <div className="info">
          <DataUser />
        </div>
        <div className="metodos-pago">
          <h4>Metodos de pago</h4>
          <div>
            <div className="mercadopago">
              <MercadoPago />
            </div>
            <div className="btn-pago">
              <div className="content">
                <FaHandHoldingDollar className="icon" />
              </div>
              {isLoggedIn ? <PagoUser /> : <PagoInvitado />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
