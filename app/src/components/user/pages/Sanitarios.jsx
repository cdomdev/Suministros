import React from "react";
import { Container } from "react-bootstrap";
import { SanitariosCard } from "../cards";

export const Sanitarios = () => {
  return (
    <section>
      <Container>
        <div className="container-productos">
          <h1>VARIEDAD DE PRODUCTOS PARA REMODELAR TUS ESPACIOS</h1>
          <p>
            Aqui encontraras los productos que necesitas para remodelar tus
            espacios, de alta calidad, esteticos y funcionales.
          </p>
          <div className="contanier-cards">
            <SanitariosCard/>
          </div>
        </div>
      </Container>
    </section>
  );
};
