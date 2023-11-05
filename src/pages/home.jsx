import React from "react";
import CarruselComponent from "../components/carrousel/carruselComponent";
import CardComponent from "../common/card";
import { Container, Row, Col, Card } from "react-bootstrap";
import TypewriterText from "../common/textWrite";
import TextPages from "../common/texComponent";
import MdiTruckFast from "../assets/animation/trck";

function Home() {
  return (
    <main>
      <CarruselComponent />

      <section className="cards-home">
        <div className="typewriter-container">
          <TypewriterText />
        </div>
        <div className="container-cards-home">
          <Container>
            <Row>
              <Col sm={3}>
                <CardComponent />
              </Col>
              <Col sm={3}>
                <CardComponent />
              </Col>
              <Col sm={3}>
                <CardComponent />
              </Col>
              <Col sm={3}>
                <CardComponent />
              </Col>
            </Row>
          </Container>
        </div>

        <TextPages
          textParts={[
            { tag: "h2", content: "Bienvenidos a Nuestra Tienda Virtual" },
          ]}
          className="txt-secundario"
        />
        <div className="container">
          <TextPages
            textParts={[
              {
                tag: "p",
                content:
                  "Suministro es una empresa especializada en acabados para la remodelación de baños, cocinas y otras áreas de tu hogar u oficina. \n En nuestro portafolio de productos importados y nacionales exhibidos. Nos especializamos para brindar lo que necesitas ",
              },
            ]}
            className="txt"
          />
        </div>

        <div className="contenedor-home">
          <Container>
            <Row>
              <Col sm={4}>
                <CardComponent />
              </Col>
              <Col sm={4}>
                <CardComponent />
              </Col>
              <Col sm={4}>
                <CardComponent />
              </Col>
            </Row>
          </Container>
        </div>

        <TextPages
          textParts={[
            { tag: "h3", content: "Todo para la remodelación de tus espacios" },
          ]}
          className="txt-secundario"
        />
        <div className="container">
          <TextPages
            textParts={[
              {
                tag: "p",
                content:
                  "Somos la marca de remodelación de los colombianos, con una tienda virtual para que compres fácil y rápido, con una amplia red de distribución por todo el país.\n Aquí encontrarás una oferta completa para todos los espacios del hogar.",
              },
              {
                tag: "p",
                content:
                  "Ofrecemos una amplia variedad de productos para que puedas encontrar exactamente lo que necesitas: pinturas, materiales de construcción y más.\n Somos fabricantes y distribuidores de marcas como Corona SAS y Listo SAS.",
              },
              {
                tag: "p",
                content:
                  "Inspírate, escoge los productos y cómpralos desde donde estés.\n También contamos con un equipo de asesores virtuales que pueden ayudarte a encontrar la solución perfecta para tu casa o negocio.",
              },
            ]}
            className="txt-complementario"
          />
        </div>
         
            <h5 className="jumping-text">¡Tu visión, nuestra misión!</h5>
         
        <div className="container">
          <div className="svg-home">
            <div className="svg-store">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="5em"
                height="5em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M12 18H6v-4h6m9 0v-2l-1-5H4l-1 5v2h1v6h10v-6h4v6h2v-6m0-10H4v2h16V4Z"
                />
              </svg>
              <h6 className="text-svg-store">Recogida en tienda</h6>
              <span className="text-svg">
                Recoge tus compras en nuestra tienda
              </span>
            </div>
            <div className='svg-truck'>
              <MdiTruckFast />
              <h6 className="svg-truck">Envio a domicilio</h6>
              <span className="text-svg">
                Tu pedido hasta la puerta de tu casa
              </span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;
