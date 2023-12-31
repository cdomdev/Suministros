import { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import img1 from "../../../assets/img/carrusel1.png";
import img2 from "../../../assets/img/carrusel2.png";
import img3 from "../../../assets/img/carrusel3.png";
import Image from "react-bootstrap/Image";

export const  Carrusel = () =>  {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <>
      <div className="carrusel-container">
        <Carousel
          activeIndex={index}
          onSelect={handleSelect}
          className="carrusel">
          <Carousel.Item className="carrusel-item">
            <CarrruselImg
              imgUrl={img1}
              altText="First slide"
              className={"img-carrusel img-fluid"}
              fluid
            />
            <Carousel.Caption className="caption">
              <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item className="carrusel-item">
            <CarrruselImg
              imgUrl={img2}
              altText="Second slide"
              className={"img-carrusel img-fluid"}
              fluid
            />
            <Carousel.Caption className="caption">
              <h3>Second slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item className="carrusel-item">
            <CarrruselImg
              imgUrl={img3}
              altText="Third slide"
              className={"img-carrusel img-fluid"}
              fluid
            />
            <Carousel.Caption className="caption">
              <h3>Third slide label</h3>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
    </>
  );
}


function CarrruselImg({ imgUrl, altText, className }) {
  return <Image src={imgUrl} alt={altText} className={className} />;
}

export { CarrruselImg };
