import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { Cards } from "../cards/Card";
import { Breadcrumbs } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Link } from "react-router-dom";
import { TiShoppingCart } from "react-icons/ti";
import { useCarShop } from "../../../hook";

export const Productos = () => {
  const [cartItemCount, setCartItemCount] = useState(0);
  const { cartItems } = useCarShop();

  useEffect(() => {
    setCartItemCount(cartItems.length);
  }, [cartItems]);
  return (
    <>
      <Container>
        <div>
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb">
            <Link to="/suministros/home">Home</Link>
            <Link to="/suministros/productos">Productos</Link>
          </Breadcrumbs>
        </div>
        <div className="container-productos">
          <h1>VARIEDAD DE PRODUCTOS PARA REMODELAR TUS ESPACIOS</h1>
          <p>
            Con una amplia variedad de productos de alta calidad, estamos aquí
            para ayudarte a hacer realidad tus proyectos de decoración y
            renovación.
          </p>
          <div className="contenedor-grid-products">
            <Cards />
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
    </>
  );
};
