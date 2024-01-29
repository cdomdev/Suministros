import React from "react";
import { useCarShop } from "../../../hook/CarShopContext";
import { InfoCar } from "./Infocar/InfoCar";
import { Summary } from "./summary/Summary";

export const Car = ({ handleContinue }) => {
  const { cartItems } = useCarShop();

  const count = localStorage.getItem('count')


  return (
    <>
      <section>
        <div className="box-car">
          <div className="contendor-infor-car">
            <div className="box1">
              <span className="carrito-text">Carrito de compras <span className="count">{count || 0}</span></span>
            </div>
            <InfoCar cartItems={cartItems} />
          </div>
          <div className="contenedor-summary">
            <div className="box3">
              <span className="summary-text">Resumen de tu compra</span>
            </div>
            <Summary
              cartItems={cartItems}
              handleContinue={handleContinue}
            />
          </div>
        </div>
      </section>
    </>
  );
};
