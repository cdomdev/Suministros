import React from "react";
import { BoxText } from "../carShop/summary/BoxText";
import { Button } from "react-bootstrap";

export const SummaryEntrega = ({ cartItems, handleContinue}) => {
  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.cantidad * item.valor,
      0
    );
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
          <Button className="btn-comtinue" onClick={handleContinue}>
            Continuar
          </Button>
        </div>
        <hr />
        <BoxText />
      </div>
    </>
  );
};
