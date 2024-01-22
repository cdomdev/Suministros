// CarShopInfo.js
import React from "react";
import { Container } from "react-bootstrap";
import { useCarShop } from "../../../hook/CarShopContext";
import { Steps } from "../carShop/Steps";
import { Car } from "../carShop/Car";



export const CarShopInfo = () => {
  const { cartItems, activeStep } = useCarShop();

  return (
    <>
      <Container className="container-car">
        <section>
          <Steps activeStep={activeStep} />
          <Car cartItems={cartItems}  />
        </section>
      </Container>
    </>
  );
};
