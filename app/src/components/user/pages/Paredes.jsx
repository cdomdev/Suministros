import React, { useState, useEffect } from "react";
import { CardSubcategorias } from "../cards";
import { Link } from "react-router-dom";
import { TiShoppingCart } from "react-icons/ti";
import { useCarShop } from "../../../hook";
import { Migajas } from "../migajas/Migajas";

export const Paredes = () => {
  const [cartItemCount, setCartItemCount] = useState(0);
  const { cartItems } = useCarShop();

  useEffect(() => {
    setCartItemCount(cartItems.length);
  }, [cartItems]);
  return (
    <>
      <section>
        <div className="migajas">
         <Migajas categoriaRuta={'Pisos y paredes'} subcategoriaRuta={'Paredes'} />
        </div>
        <div className="container-productos">
          <div className="contenedor-grid-products">
            <div className="content-text">
              <h1>Paredes</h1>
              <h2>
                Personaliza tus espacions con nuestro portafolio de paredes.
              </h2>
              <p>
                Nuestras opciones transformarán cualquier ambiente en un espacio
                único y acogedor.
              </p>
            </div>
            <CardSubcategorias RutaSubCategoria={'pisos'} nombreSubcategoria={'Paredes'} unidad={'Mt'}/>
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
