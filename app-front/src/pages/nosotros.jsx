import React from "react";
import { NavbarComponent } from "../components/user/Nav/NavbarComponent";
import { Container } from "react-bootstrap";
import "../styles/App.css";
import { FaFacebook } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { FaXTwitter } from "react-icons/fa6";

export const Nosotros = () => {
  return (
    <>
      <header>
        <NavbarComponent />
      </header>
      <Container className="seccion-nosotros-user">
        <h2 className="title-nosotros">Sobre suministros</h2>

        <p className="text-nosotros">
          <strong>Suministros</strong> una empresa colombiana conocida por su
          compromiso en proveer productos esenciales para diversas industrias,
          se complace en anunciar una emocionante renovación de su identidad
          corporativa. Este cambio refleja nuestra firme dedicación a la
          innovación y nuestra constante búsqueda de mejores formas de
          satisfacer las necesidades de nuestros clientes y socios comerciales.
          La nueva imagen de Suministros captura la dinámica y la vitalidad de
          nuestra empresa en el contexto actual, sin renunciar a nuestra promesa
          de calidad ni a nuestra marca que han sido los pilares de nuestro
          éxito durante años. <br /> Esta transformación abarca nuestra
          presencia en línea y redefine completamente nuestra estrategia
          publicitaria, dándonos una identidad fresca, audaz y preparada para el
          futuro.
        </p>
        <p className="text-nosotros">
          Nuestro nuevo logotipo conserva los colores corporativos que nos
          identifican y presenta un distintivo símbolo que representa nuestro
          compromiso constante con la excelencia en el suministro de productos
          esenciales para la construccion o remoldelacion de tus espeacios.
          Estamos emocionados por esta nueva etapa y confiamos en que esta
          transformación nos permitirá mantener y fortalecer nuestra posición
          como líderes en el suministro de productos esenciales para la
          remodelacion y construccion de espacions familiares y coorporativos,
          estando preparados para los desafíos y oportunidades que nos aguardan.
        </p>

        <div className="contenedor-mision-objetivos">
          <div className="contenedor-mision">
            <h3 className="text-title-nosotros">Mision</h3>
            <p className="text-nosotros-mision-objetivos">
              Nuestra misión es ser el socio de confianza y el proveedor líder
              de productos esenciales para diversas industrias. Estamos
              dedicados a satisfacer las necesidades de nuestros clientes y
              socios comerciales al proporcionar productos de la más alta
              calidad, un servicio excepcional y soluciones innovadoras. Nos
              esforzamos por mantener y fortalecer relaciones sólidas y
              duraderas con nuestros clientes, basadas en la integridad, la
              confiabilidad y la excelencia en el servicio.
            </p>
          </div>
          <div className="contendor-objetivos">
            <h3 className="text-title-nosotros">Obejivos de calidad</h3>
            <p className="text-nosotros-mision-objetivos">
              En Suministros, estamos comprometidos con la entrega de productos
              y servicios de la más alta calidad. Esto implica cumplir con los
              estándares de calidad establecidos y superar las expectativas de
              nuestros clientes.
            </p>
            <p className="text-nosotros-mision-objetivos">
              La satisfacción del cliente es nuestra principal prioridad.
              Trabajamos para comprender las necesidades de nuestros clientes y
              asegurarnos de que sus expectativas se cumplan en todos los
              aspectos de nuestra operación.
            </p>
          </div>
        </div>

        <div className="contenedor-redes-sociales">
            <h3 className="title-nosotros">Nuetras redes</h3>
            <div className="redes">
            <FaFacebook className="icon-redes" />
            <AiFillInstagram  className="icon-redes" />
            <FaXTwitter className="icon-redes" />
            </div>
          
        </div>
      </Container>
    </>
  );
};
