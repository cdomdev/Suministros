import React from "react";
import { Carrusel } from "../Carrusel/Carrusel";
import { Container } from "react-bootstrap";
import MdiTruckFast from "../../../assets/animation/trck";
import "../../../styles/App.css";
import { Link } from "react-router-dom";

export const HomeUser = () => {
  return (
    <>
      <section>
        <div className="content-carrusel">
          <Carrusel />
        </div>
        <div className="contenido">
          <Contenido />
        </div>
      </section>
    </>
  );
};

export const Contenido = () => {
  return (
    <>
      <Container>
        <h1>Titulo</h1>
        <div>
          <p className="txt">
            Suministro es una empresa especializada en acabados para la
            remodelación de baños, cocinas y otras áreas de tu hogar u oficina.{" "}
            <br /> Encuentra eso que necesitas en nuestro portafollio de
            productos nacionales eh importados.
          </p>
        </div>
        <h2>
          <strong>¿ Buscas algo especial ?</strong>
        </h2>
        <div className="box-products-home">
          <Link to="/categoria/pinturas" className="link">
            <div className="box-route  box1">
              <span className="text-box">Pinturas</span>
            </div>
          </Link>
          <Link to="/categoria/limpiadores" className="link">
            <div className="box-route  box2">
              <span className="text-box">Limpiadores</span>
            </div>
          </Link>
          <Link to="/categoria/pegantes" className="link">
            <div className="box-route  box3">
              <span className="text-box">Pegantes</span>
            </div>
          </Link>
        </div>
        <div>
          <p>
            Somos la marca de remodelación de los colombianos, con una tienda
            virtual para que compres fácil y rápido, con una amplia red de
            distribución por todo el país. Somos la marca de remodelación de los
            colombianos, con una tienda virtual para que compres fácil y rápido,
            con una amplia red de distribución por todo el país. Ofrecemos una
            amplia variedad de productos para que puedas encontrar exactamente
            lo que necesitas: pinturas, materiales de construcción y más. Somos
            distribuidores de marcas como Corona SAS y Listo SAS.
          </p>
        </div>
        <h4 className="jumping-text">¡Tu visión, nuestra misión!</h4>
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
              <h5 className="text-svg-store">Recogida en tienda</h5>
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
    </>
  );
};
