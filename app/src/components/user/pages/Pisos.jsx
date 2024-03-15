import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { TiShoppingCart } from "react-icons/ti";
import { useCarShop } from "../../../hook";
import { CardSubcategorias } from "../cards";
import {Migajas} from '../migajas/Migajas'


export const Pisos = () => {
  const [cartItemCount, setCartItemCount] = useState(0);
  const { cartItems } = useCarShop();

  useEffect(() => {
    setCartItemCount(cartItems.length);
  }, [cartItems]);
  return (
    <section>
      <div className="migajas">
        <Migajas categoriaRuta={'Pisos y paredes'} subcategoriaRuta={'Pisos'}/>
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
          <CardSubcategorias RutaSubCategoria={'pisos'} nombreSubcategoria={'Pisos'} unidad={'Mt'}/>
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
