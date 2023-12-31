import React from "react";
import { Carrusel } from "../components/user/Carrusel/Carrusel";
import { Container} from "react-bootstrap";
import TypewriterText from "../components/textWrite";
import MdiTruckFast from "../assets/animation/trck";
import { NavbarComponent } from "../components/user/Nav/NavbarComponent";
import '../styles/App.css'
export const HomeUser = () => {
  return (
    <>
      <header>
        <NavbarComponent />
      </header>
      <main>
        <Carrusel />
        <div className="typewriter-container">
          <TypewriterText />
        </div>
        <Container>
          <h2 className="subtitulo-home">
            Bienvenidos a Nuestra Tienda Virtual
          </h2>
          <p className="content-text-home">
            Suministro es una empresa especializada en acabados para la
            remodelación de baños, cocinas y otras áreas de tu hogar u oficina.
            <br />
            En nuestro portafolio de productos importados y nacionales
            exhibidos. Nos especializamos para brindar lo que necesitas
          </p>
          <div className="box-products-home">
            <div className="caja">caja 1</div>
            <div className="caja">caja 2</div>
            <div className="caja">caja 3</div>
          </div>

          <h3 className="subtitulo-home">
            Todo para la remodelación de tus espacios
          </h3>

          <p className="content-text-home">
            Somos la marca de remodelación de los colombianos, con una tienda
            virtual para que compres fácil y rápido, con una amplia red de
            distribución por todo el país. <br /> Aquí encontrarás una oferta
            completa para todos los espacios del hogar.
            <br />
            Ofrecemos una amplia variedad de productos para que puedas encontrar
            exactamente lo que necesitas: pinturas, materiales de construcción y
            más.
            <br /> Somos fabricantes y distribuidores de marcas como Corona SAS
            y Listo SAS.
            <br />
            Inspírate, escoge los productos y cómpralos desde donde estés.{" "}
            <br />
            También contamos con un equipo de asesores virtuales que pueden
            ayudarte a encontrar la solución perfecta para tu casa o negocio.
          </p>

          <h5 className="jumping-text">¡Tu visión, nuestra misión!</h5>
          <div className="container">
            <div className="svg-home">
              <div className="svg-store">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="5em"
                  height="5em"
                  viewBox="0 0 24 24">
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
              <div className="svg-truck">
                <MdiTruckFast />
                <h6 className="svg-truck">Envio a domicilio</h6>
                <span className="text-svg">
                  Tu pedido hasta la puerta de tu casa
                </span>
              </div>
            </div>
          </div>
        </Container>
      </main>
    </>
  );
};
