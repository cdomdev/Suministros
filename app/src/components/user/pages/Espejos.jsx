import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { TiShoppingCart } from "react-icons/ti";
import { useCarShop } from "../../../hook";
import { CardSubcategorias } from "../cards";
import { Migajas } from "../migajas/Migajas";

export const Espejos = () => {
  const [cartItemCount, setCartItemCount] = useState(0);
  const { cartItems } = useCarShop();

  useEffect(() => {
    setCartItemCount(cartItems.length);
  }, [cartItems]);

  return (
    <section>
      <div className="migajas">
        <Migajas categoriaRuta={"Baños"} subcategoriaRuta={"Espejos"} />
      </div>
      <div className="container-productos">
        <div className="contenedor-grid-products">
          <div className="content-text">
            <h1>Espejos</h1>
            <h2>
              Amplia rus espacios con nuestros espejos de diseño para cada
              rincon del hogar.
            </h2>
            <p>
              Desde espejos decorativos hasta espejos de aumento, encontrarás la
              pieza perfecta para añadir profundidad y elegancia a tus espacios.
            </p>
          </div>
          <CardSubcategorias
            RutaSubCategoria={"espejos"}
            nombreSubcategoria={"Griferias"}
            unidad={'UN'}
          />
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
