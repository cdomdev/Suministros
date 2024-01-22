import React from "react";
import { Container } from "react-bootstrap";

export const Ofertas = () => {
  return (
    <>
      <Container className="container-ofertas">
        <section>
          <h1>DESCUBRE LAS OFERTAS Y PROMOCIONES QUE TENEMOS PARA TI.</h1>
          <p>
            Aquí podrás encontrar descuentos exclusivos de una gran variedad de
            productos. <br /> Es la oportunidad para lograr la remodelación que
            deseas.
          </p>
          <div className="contanier-cards"></div>
        </section>
      </Container>
    </>
  );
};
