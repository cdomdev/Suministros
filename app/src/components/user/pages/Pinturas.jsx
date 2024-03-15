import React, { useState, useEffect } from "react";
import { CardSubcategorias } from "../cards";
import { Breadcrumbs } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Link } from "react-router-dom";
import { TiShoppingCart } from "react-icons/ti";
import { useCarShop } from "../../../hook";
import { BiHomeAlt2 } from "react-icons/bi";
import {Migajas} from '../migajas/Migajas'


export const Pinturas = () => {
  const [cartItemCount, setCartItemCount] = useState(0);
  const { cartItems } = useCarShop();

  useEffect(() => {
    setCartItemCount(cartItems.length);
  }, [cartItems]);
  return (
    <>
      <section>
        <div className="migajas">
          <Migajas categoriaRuta={'Construccion y remodelacion'} subcategoriaRuta={'Pinturas'}/>
        </div>
        <div className="container-productos">
          <div className="contenedor-grid-products">
            <div className="content-text">
              <h1>Pinturas</h1>
              <h2>
                Descubre colores bibrantes y acabados perfectos para cada uno de
                tus proyectos
              </h2>
              <p>
                Nuestra gama de colores vibrantes y acabados duraderos te
                permite crear ambientes que reflejen tu estilo y personalidad
              </p>
            </div>
            <CardSubcategorias RutaSubCategoria={'pinturas'} nombreSubcategoria={'Pinturas'} unidad={'UN'}/>
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
    </>
  );
};
