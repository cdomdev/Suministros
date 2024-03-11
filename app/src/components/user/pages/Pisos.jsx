import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { CardPisos } from "../cards/CardPisos";
import { Breadcrumbs } from "@mui/material";
import { Link } from "react-router-dom";
import { TiShoppingCart } from "react-icons/ti";
import { useCarShop } from "../../../hook";
import { BiHomeAlt2 } from "react-icons/bi";

export const Pisos = () => {
  const [cartItemCount, setCartItemCount] = useState(0);
  const { cartItems } = useCarShop();

  useEffect(() => {
    setCartItemCount(cartItems.length);
  }, [cartItems]);
  return (
    <section>
      <div className="migajas">
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="medium" />}
          aria-label="breadcrumb">
          <Link to="/suministros/home">
            <BiHomeAlt2 className="icon" />
          </Link>
          <Link to="/suministros/pisos">Pisos</Link>
        </Breadcrumbs>
      </div>
      <div className="container-productos">
        <div className="contenedor-grid-products">
          <div className="content-text">
            <h1>Pisos</h1>
            <h2>
              Propuestas innovadoras para renovar tus suelos con elegancia
            </h2>
            <p>
              Encuentra el piso perfecto para tu hogar entre nuestra amplia
              selección, nuestros pisos combinan belleza y resistencia para
              satisfacer tus necesidades
            </p>
          </div>
          <CardPisos />
        </div>
      </div>
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
