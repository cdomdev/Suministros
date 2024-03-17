import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { TiShoppingCart } from "react-icons/ti";
import { useCarShop } from "../../../hook";
import { CardCategorias } from "../cards";
import { Migajas } from "../migajas/Migajas";


export const BañosCategoria = () => {
  const [cartItemCount, setCartItemCount] = useState(0);
  const { cartItems } = useCarShop();

  useEffect(() => {
    setCartItemCount(cartItems.length);
  }, [cartItems]);

  return (
    <section>
      <div className="migajas">
        <Migajas categoriaRuta={"Baños"} />
      </div>
      <div className="container-productos">
        <div className="contenedor-grid-products">
          <div className="content-text"></div>
          <CardCategorias rutaCategoria={"baños"} nombreCategoria={"Baños"} />
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
