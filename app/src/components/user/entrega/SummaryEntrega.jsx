import React, { useState } from "react";
import { BoxText } from "../carShop/summary/BoxText";
import { Button } from "react-bootstrap";
import { useCarShop } from "../../../hook";
import { useNavigate } from "react-router";

export const SummaryEntrega = ({ cartItems }) => {
  const { activeStep, setStep } = useCarShop();
  const [message, setMessage] = useState("");

  const navigate = useNavigate()

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.cantidad * item.valor,
      0
    );
  };

   const handleContinueClick = () => {
    const data = localStorage.getItem("DtUerForEnComp");
    if (!data) {
      setMessage("¡AGREGUE LOS DATOS DE ENVIO PARA CONTINUAR!");
      setTimeout(() => setMessage(""), 4000);
    } else {
      navigate("/suministros/pago");
      setStep(activeStep + 1);
    }
  };
  
  return (
    <>
      <div className="box4">
        <span className="subtotal">
          Subtotal:
          {cartItems.reduce(
            (total, item) => total + item.cantidad * item.valor,
            0
          )}
        </span>
        <br />
        <span>Costo envio:</span>
        <hr />
        <h3>
          Total a pagar <span className="line">----------------</span> $
          {calculateTotal()}
        </h3>
        <span className="costo">El costo de envio no esta incluido</span>
        <hr />
        <div className="cont-btn">
          <span className="message">{message}</span>
          <Button className="btn-comtinue" onClick={handleContinueClick}>
            Continuar
          </Button>
        </div>
        <hr />
        <BoxText />
      </div>
    </>
  );
};
