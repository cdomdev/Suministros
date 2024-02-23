import React, { useEffect, useState } from "react";
import { DataUser } from "./DataUser";
import { MercadoPago, PagoUser, PagoInvitado } from "../MetodosDePago";
import { Button } from "react-bootstrap";
import { FaHandHoldingDollar } from "react-icons/fa6";
import { FaHandshake } from "react-icons/fa";
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
            <div className="btn-pago">
              {isLoggedIn ? <PagoUser /> : <PagoInvitado />}

              <FaHandHoldingDollar className="icon" />
            </div>
            <div className="btn-pago mercado-pago">
              <Button>Mercadopago</Button>
              <FaHandshake className="icon" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
