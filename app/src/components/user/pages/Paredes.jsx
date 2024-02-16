import React, { useState, useEffect } from "react";
import { CardParedes } from "../cards";
import { Container } from "react-bootstrap";
import { Breadcrumbs } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Link } from "react-router-dom";
import { TiShoppingCart } from "react-icons/ti";
import { useCarShop } from "../../../hook";

export const Paredes = () => {
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
            <Link to="/suministros/peredes">Paredes</Link>
          </Breadcrumbs>
          <div className="container-productos">
            <h1>PERSONALIZA TUS ESPACIOS CON NUESTRO PORTAFOLIO DE PAREDES</h1>
            <p>
              Nuestras opciones transformarán cualquier ambiente en un espacio
              único y acogedor
            </p>
            <div className="contenedor-grid-products">
              <CardParedes />
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
