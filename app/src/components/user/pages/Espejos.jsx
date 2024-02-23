import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { EspejosCard } from "../cards/EspejosCard";
import { Breadcrumbs } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Link } from "react-router-dom";
import { TiShoppingCart } from "react-icons/ti";
import { useCarShop } from "../../../hook";
import { BiHomeAlt2 } from "react-icons/bi";
export const Espejos = () => {
  const [cartItemCount, setCartItemCount] = useState(0);
  const { cartItems } = useCarShop();

  useEffect(() => {
    setCartItemCount(cartItems.length);
  }, [cartItems]);

  return (
    <section>
      <div className="migajas">
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb">
          <Link to="/suministros/home">
            <BiHomeAlt2 className="icon" />
          </Link>
          <Link to="/suministros/espejos">Espejos</Link>
        </Breadcrumbs>
      </div>
      <div className="container-productos">
        <h1>
          AMPLIA TUS ESPACIOS CON NUESTROS ESPEJOS DE DISEÑO PARA CADA RINCON
          DEL HOGAR
        </h1>
        <p>
          Desde espejos decorativos hasta espejos de aumento, encontrarás la
          pieza perfecta para añadir profundidad y elegancia a tus espacios
        </p>
        <div className="contenedor-grid-products">
          <EspejosCard />
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
