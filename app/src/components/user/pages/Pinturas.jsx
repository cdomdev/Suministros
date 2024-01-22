import React from "react";
import { CardPinturas } from "../cards/CardPinturas";
import { Container } from "react-bootstrap";

export const Pinturas = () => {
  return (
    <>
      <section>
        <Container>
          <h1>PINTURAS</h1>
          <p>
            ¡ Explora nuestro mundo de colores y creatividad en nuestra sección
            de Pinturas! <br /> Sumérgete en una paleta infinita de tonos y
            matices que inspirarán tus proyectos de renovación y decoración.
          </p>
          <div className="categorias">
            <div className="contanier-section-categorias">
              <CardPinturas />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};
