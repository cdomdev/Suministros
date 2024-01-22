import React from "react";
import { Container } from "react-bootstrap";
import { CardLimpiadores } from "../cards/CardLimpiadoresa";

export const Limpiadores = () => {
  return (
    <>
      <section>
        <Container>
          <h1>LIMPIADORES</h1>
          <p>
            ¡ Explora nuestro mundo de colores y creatividad en nuestra sección
            de Pinturas! <br /> Sumérgete en una paleta infinita de tonos y
            matices que inspirarán tus proyectos de renovación y decoración.
          </p>
          <div className="categorias">
            <div className="contanier-section-categorias">
              <CardLimpiadores />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};
