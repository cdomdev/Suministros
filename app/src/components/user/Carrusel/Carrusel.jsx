import { Carousel } from "react-bootstrap";
import img1 from "../../../assets/images/c1.webp";
import img2 from "../../../assets/images/c2.webp";
import img3 from "../../../assets/images/c3.webp";
import {Link} from 'react-router-dom'

export const Carrusel = () => {
  return (
    <>
      <Carousel data-bs-theme="dark" className="carrusel">
        <Carousel.Item>
          <img
            className="d-block w-100 carousel-image "
            src={img1}
            alt="First slide"
          />
          <Carousel.Caption>
            <h5>First slide label</h5>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 carousel-image"
            src={img2}
            alt="Second slide"
          />

          <Carousel.Caption className="text-carrusel">
            <h4>
              VISITA NUESTRO CATALOGO DE PRODUCTOS <br />
            </h4>
            <h5>Y ENCUANTRA LO NECESARIO PARA RENOVAR CADA ESPACIO DE TU HOGAR</h5>
            <Link to={'/suministros/construccionyremodelacion'}>IR AL CATALOGO</Link>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 carousel-image"
            src={img3}
            alt="Third slide"
          />
          <Carousel.Caption>
            <h5>Third slide label</h5>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </>
  );
};
