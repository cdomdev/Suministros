import React from "react";
import { useCarShop } from "../../../hook";
import { Steps } from "../carShop";
import { Info, Summary } from "../pago";

export const PagoPage = () => {
  const { activeStep } = useCarShop();

  return (
    <section>
      <Steps activeStep={activeStep} />
      <div className="details">
        <div className="info">
          <Info />
        </div>
        <div className="summary">
          <Summary />
        </div>
      </div>
    </section>
  );
};
