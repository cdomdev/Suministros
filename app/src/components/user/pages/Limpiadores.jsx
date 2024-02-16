import React, { useEffect, useState } from "react";
import { CardLimpiadores } from "../cards";
import { Container } from "react-bootstrap";
import { Breadcrumbs } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Link } from "react-router-dom";
import { TiShoppingCart } from "react-icons/ti";
import {useCarShop} from '../../../hook'


export const Limpiadores = () => {
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
            <Link to="/suministros/limpiadores">Limpiadores</Link>
          </Breadcrumbs>
          <div className="container-productos">
            <h1>
              ENCUENTRA SOLUCIONES EFIACES PARA DES TUS ESPACION IMPECABLES
              DESPUES DE LA CONTRUCCION
            </h1>
            <p>
              Diseñados para eliminar residuos de obra de manera eficaz,
              nuestros productos te ayudarán a destacar la calidad de tu
              trabajo.
            </p>
            <div className="contenedor-grid-products">
              <CardLimpiadores />
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
