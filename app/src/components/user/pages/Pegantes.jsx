import React, { useState, useEffect } from "react";
import {CardSubcategorias} from "../cards";
import { Link } from "react-router-dom";
import { TiShoppingCart } from "react-icons/ti";
import { useCarShop } from "../../../hook";
import {Migajas} from '../migajas/Migajas'


export const Pegantes = () => {
  const [cartItemCount, setCartItemCount] = useState(0);
  const { cartItems } = useCarShop();

  useEffect(() => {
    setCartItemCount(cartItems.length);
  }, [cartItems]);
  return (
    <>
      <section>
        <div className="migajas">
        <Migajas categoriaRuta={'Construccion y remodelacion'}subcategoriaRuta={'Pegantes'} />
        </div>
        <div className="container-productos">
          <div className="contenedor-grid-products">
            <div className="content-text">
              <h1>Pegantes ceramicos</h1>
              <h2>
                Asegura la calidad de tus proyectos con nuestros pegantes
                ceramicos.
              </h2>
              <p>
                Nuestra fórmula especial garantiza una adhesión duradera para
                tus proyectos de revestimiento.
              </p>
            </div>
            <CardSubcategorias RutaSubCategoria={'pegantes'} nombreSubcategoria={'Pegantes'} />
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
