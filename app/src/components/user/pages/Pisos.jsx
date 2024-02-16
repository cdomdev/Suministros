import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { CardPisos } from "../cards/CardPisos";
import { Breadcrumbs } from "@mui/material";
import { Link } from "react-router-dom";
import { TiShoppingCart } from "react-icons/ti";
import { useCarShop } from "../../../hook";

export const Pisos = () => {
  const [cartItemCount, setCartItemCount] = useState(0);
  const { cartItems } = useCarShop();

  useEffect(() => {
    setCartItemCount(cartItems.length);
  }, [cartItems]);
  return (
    <section>
      <Container>
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="medium" />}
          aria-label="breadcrumb">
          <Link to="/suministros/home">Home</Link>
          <Link to="/suministros/pisos">Pisos</Link>
        </Breadcrumbs>
        <div className="container-productos">
          <h1>
            DESCUBRE NUESTRAS PROPUESTAS INNOVADORAS PARA RENOVAR TUS SUELOS CON
            ELEGANCIA
          </h1>
          <p>
            Encuentra el piso perfecto para tu hogar entre nuestra amplia
            selección, nuestros pisos combinan belleza y resistencia para
            satisfacer tus necesidades
          </p>
          <div className="contenedor-grid-products">
            <CardPisos />
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
  );
};
