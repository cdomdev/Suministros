// CarShopInfo.js
import React from "react";
import { Container } from "react-bootstrap";
import { useCarShop } from "../../../hook/CarShopContext";
import { Steps } from "../carShop/Steps";
import { EntregaCar } from "../entrega/EntregaCar";

export const Entrega = () => {
  const { cartItems, activeStep, setStep } = useCarShop();

  const handleContinue = () => {
    setStep((prevStep) => prevStep + 1);
  };

  return (
    <>
      <div className="container-car">
        <section>
          <Steps activeStep={activeStep} />
          <EntregaCar cartItems={cartItems} handleContinue={handleContinue} />
        </section>
      </div>
    </>
  );
};
