import React,{ useState, useEffect} from "react";
import { CardPegantes } from "../cards";
import { Container } from "react-bootstrap";
import { Breadcrumbs } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Link } from "react-router-dom";
import { TiShoppingCart } from "react-icons/ti";
import {useCarShop} from '../../../hook'



export const Pegantes = () => {
  const [cartItemCount, setCartItemCount] = useState(0);
  const { cartItems } = useCarShop();

  useEffect(() => {
    setCartItemCount(cartItems.length);
  }, [cartItems]);
  return (
    <>
      <section>
        <Container>
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="medium" />}
          aria-label="breadcrumb">
          <Link to="/suministros/home">Home</Link>
          <Link to="/suministros/pegantes">Pegantes</Link>
        </Breadcrumbs>
          <div className="container-productos">
            <h1>
              ASEGURA LA CALIDAD DE TUS PROYECTOS CON NUESTROS PAGANTES
              CERAMICOS DE ALTO RENDIMIENTO
            </h1>
            <p>
              Nuestra fórmula especial garantiza una adhesión duradera para tus
              proyectos de revestimiento
            </p>
            <div className="contenedor-grid-products">
              <CardPegantes />
            </div>
          </div>
        </Container>
        {cartItemCount > 0 && (
        <Link to={"/suministros/car"}>
          <div class="icon-container">
            <div className="insignia">{cartItemCount}</div>
            <TiShoppingCart className="icon-car" />
          </div>
        </Link>
      )}
      </section>
    </>
  );
};
