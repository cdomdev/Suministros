import React, { useState, useEffect } from "react";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Breadcrumbs } from "@mui/material";
import { Link } from "react-router-dom";
import { TiShoppingCart } from "react-icons/ti";
import { useCarShop } from "../../../hook";
import { CardsOfertas } from "../cards";
import { BiHomeAlt2 } from "react-icons/bi";

export const Ofertas = () => {
  const [cartItemCount, setCartItemCount] = useState(0);
  const { cartItems } = useCarShop();

  useEffect(() => {
    setCartItemCount(cartItems.length);
  }, [cartItems]);

  return (
    <>
      <div className="migajas">
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb">
          <Link to="/suministros/home">
            <BiHomeAlt2 className="icon" />
          </Link>
          <Link to="/suministros/ofertas">Ofertas</Link>
        </Breadcrumbs>
      </div>
      <div className="container-productos">
        <div className="contenedor-grid-products">
          <div className="content-text">
            <h1>Ofertas</h1>
            <h2>
              Aprovecha nuestras ofertas especiales y encuentra prodcutos de
              calida a precios irresistibles
            </h2>
            <p>
              Aprovecha nuestras ofertas especiales y encuentra productos de
              calidad a precios unicos. nuestras ofertas te permitirán ahorrar
              en tus proyectos de renovación
            </p>
          </div>
          <CardsOfertas />
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
    </>
  );
};
