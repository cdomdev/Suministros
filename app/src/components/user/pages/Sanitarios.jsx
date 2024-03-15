import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { TiShoppingCart } from "react-icons/ti";
import { CardSubcategorias } from "../cards";
import { useCarShop } from "../../../hook";
import { Migajas } from "../migajas/Migajas";

export const Sanitarios = () => {
  const [cartItemCount, setCartItemCount] = useState(0);
  const { cartItems } = useCarShop();

  useEffect(() => {
    setCartItemCount(cartItems.length);
  }, [cartItems]);

  return (
    <section>
      <div className="migajas">
       <Migajas categoriaRuta={'Baños'} subcategoriaRuta={'Sanitarios'}/>
      </div>
      <div className="container-productos">
        <div className="contenedor-grid-products">
          <div className="content-text">
            <h1>Sanitarios</h1>
            <h2>Sanitarios que combinan estilo y funcionalidad.</h2>
            <p>
              Desde inodoros elegantes hasta bidés prácticos, nuestra colección
              ofrece opciones para todo tipo de baños.
            </p>
          </div>
          <CardSubcategorias  RutaSubCategoria={'sanitarios'} nombreSubcategoria={'Sanitarios'} unidad={'UN'} />
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
