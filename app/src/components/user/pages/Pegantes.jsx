import React from "react";
import { CardPegantes } from "../cards/CardPegantes";
import { Container } from "react-bootstrap";

export const Pegantes = () => {
  return (
    <>
      <section>
        <Container>
          <h1 className="title-pinturas">PEGANTES</h1>
          <p>
            ¡ Explora nuestro mundo de colores y creatividad en nuestra sección
            de Pinturas! <br /> Sumérgete en una paleta infinita de tonos y
            matices que inspirarán tus proyectos de renovación y decoración.
          </p>
          <div className="categorias">
            <div className="contanier-section-categorias">
              <CardPegantes />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};
