import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { LavaplatosCard } from "../cards/LavaplatosCard";
import { Breadcrumbs } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Link } from "react-router-dom";
import { TiShoppingCart } from "react-icons/ti";
import { useCarShop } from "../../../hook";
import { BiHomeAlt2 } from "react-icons/bi";
export const Lavaplatos = () => {
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
          <Link to="/suministros/lavaplatos">Lavaplatos</Link>
        </Breadcrumbs>
      </div>
      <div className="container-productos">
        <h1>
          ENCUENTRA LA SOLUCION PERFECTA PARA MANTENER UTENCILIOS LIMPIOS Y
          RELUCIENTES
        </h1>
        <p>
          Diseñados para ofrecer un rendimiento excepcional, nuestros lavaplatos
          te ayudarán a mantener tu cocina impecable con facilidad
        </p>
        <div className="contenedor-grid-products">
          <LavaplatosCard />
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
