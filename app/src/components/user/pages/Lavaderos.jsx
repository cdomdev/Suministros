import React, {useEffect, useState} from "react";
import { Container } from "react-bootstrap";
import { LavaderosCard } from "../cards/LavaderosCard";
import { Breadcrumbs } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Link } from "react-router-dom";
import { TiShoppingCart } from "react-icons/ti";
import {useCarShop} from '../../../hook'


export const Lavaderos = () => {
  const [cartItemCount, setCartItemCount] = useState(0);
  const { cartItems } = useCarShop();

  useEffect(() => {
    setCartItemCount(cartItems.length);
  }, [cartItems]);
  return (
    <section>
      <Container>
      <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb">
          <Link to="/suministros/home">Home</Link>
          <Link to="/suministros/lavaderos">Lavaderos</Link>
        </Breadcrumbs>
        <div className="container-productos">
          <h1>
            DESCUBRE SOLUCIONES PRATICAS PARA HACER DEL LAVADO UNA TAREA MAS
            COMODA Y EFICIENTE
          </h1>
          <p>
            esde lavaderos de acero inoxidable hasta modelos de resina,
            encontrarás la solución perfecta para tus necesidades de lavandería
          </p>
          <div className="contenedor-grid-products">
            <LavaderosCard />
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
