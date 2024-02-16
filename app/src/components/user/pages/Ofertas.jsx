import React, {useState, useEffect}from "react";
import { Container } from "react-bootstrap";
import { Breadcrumbs } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Link } from "react-router-dom";
import { TiShoppingCart } from "react-icons/ti";
import { useCarShop } from "../../../hook";

export const Ofertas = () => {
  const [cartItemCount, setCartItemCount] = useState(0);
  const { cartItems } = useCarShop();

  useEffect(() => {
    setCartItemCount(cartItems.length);
  }, [cartItems]);
  return (
    <>
      <Container className="container-ofertas">
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="medium" />}
          aria-label="breadcrumb">
          <Link to="/suministros/home">Home</Link>
          <Link to="/suministros/ofertas">Ofertas</Link>
        </Breadcrumbs>
        <section>
          <h1>
            APROVECHA NUESTRAS OFERTAS ESPECIALES Y ENCUENTRA PRODUCTOS DE
            CALIDAD A PRECIOS IRRESISTIBLES
          </h1>
          <p>
            Aprovecha nuestras ofertas especiales y encuentra productos de
            calidad a precios unicos. nuestras ofertas te permitirán ahorrar en
            tus proyectos de renovación
          </p>
          <div className="contanier-cards"></div>
        </section>
       
      </Container>
      {cartItemCount > 0 && (
          <Link to={"/suministros/car"}>
            <div class="icon-container">
              <div className="insignia">{cartItemCount}</div>
              <TiShoppingCart className="icon-car" />
            </div>
          </Link>
        )}
    </>
  );
};
