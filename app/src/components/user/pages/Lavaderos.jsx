import React, { useEffect, useState } from "react";
import { Breadcrumbs } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Link } from "react-router-dom";
import { TiShoppingCart } from "react-icons/ti";
import { useCarShop } from "../../../hook";
import { BiHomeAlt2 } from "react-icons/bi";
import { CardSubcategorias } from "../cards";
import {Migajas} from '../migajas/Migajas'


export const Lavaderos = () => {
  const [cartItemCount, setCartItemCount] = useState(0);
  const { cartItems } = useCarShop();

  useEffect(() => {
    setCartItemCount(cartItems.length);
  }, [cartItems]);
  return (
    <section>
      <div className="migajas">
       <Migajas categoriaRuta={'Cocinas'} subcategoriaRuta={'Lavaderos'}/>
      </div>
      <div className="container-productos">
        <div className="contenedor-grid-products">
          <div className="content-text">
            <h1>Lavaderos</h1>
            <h2>
              Descubre soluciones practicas para hacer del lavado una tarea mas
              comoda y eficiente.
            </h2>
            <p>
              esde lavaderos de acero inoxidable hasta modelos de resina,
              encontrarás la solución perfecta para tus necesidades de
              lavandería.
            </p>
          </div>
          <CardSubcategorias RutaSubCategoria={'lavaderos'} nombreSubcategoria={'Lavaderos'} unidad={'UN'}/>
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
