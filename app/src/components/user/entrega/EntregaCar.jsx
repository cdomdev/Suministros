import React from "react";
import { useCarShop } from "../../../hook/CarShopContext";
import {InfoCarEntrega} from './InfoCarEntrega'
import {SummaryEntrega} from './SummaryEntrega'


export const EntregaCar = ({ setActiveStep, handleContinue }) => {
  const { cartItems } = useCarShop();

  return (
    <>
      <section>
        <div className="box-car">
          <InfoCarEntrega  />
          <div className="contenedor-summary">
            <div className="box3">
              <span className="summary-text">Resumen de tu compra</span>
            </div>
            <SummaryEntrega
              cartItems={cartItems}
              setActiveStep={setActiveStep}
              handleContinue={handleContinue}
            />
          </div>
        </div>
      </section>
    </>
  );
};



// component reseumen de compra en entrega
