import React from "react";
import { CardLimpiadores} from "../cards";
import { Container } from "react-bootstrap";


export const Limpiadores = () => {
  return (
    <>
      <section>
        <Container>
          <div className="container-productos">
          <h1>LIMPIADORES</h1>
          <p>
            ¡ Explora nuestro mundo de colores y creatividad en nuestra sección
            de Pinturas! <br /> Sumérgete en una paleta infinita de tonos y
            matices que inspirarán tus proyectos de renovación y decoración.
          </p>
            <div className="contanier-cards">
              <CardLimpiadores/>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

