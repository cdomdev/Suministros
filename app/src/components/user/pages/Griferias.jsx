import React, { useState, useEffect } from "react";
import { CardSubcategorias} from "../cards";
import { Link } from "react-router-dom";
import { TiShoppingCart } from "react-icons/ti";
import { useCarShop } from "../../../hook";
import {Migajas} from '../migajas/Migajas'

export const Griferias = () => {
  const [cartItemCount, setCartItemCount] = useState(0);
  const { cartItems } = useCarShop();

  useEffect(() => {
    setCartItemCount(cartItems.length);
  }, [cartItems]);

  return (
    <section>
      <div className="migajas">
       <Migajas categoriaRuta={'Baños'} subcategoriaRuta={'Griferias'}/>
      </div>
      <div className="container-productos">
        <div className="contenedor-grid-products">
          <div className="content-text">
            <h1>Griferias</h1>
            <h2>
              Transforma tu cocina y baño con nuestras griferias de ultima
              generacion.
            </h2>
            <p>
              Con una variedad de estilos y acabados, nuestras griferías no solo
              son elegantes, sino también duraderas y funcionales.
            </p>
          </div>
          <CardSubcategorias RutaSubCategoria={'griferias'} nombreSubcategoria={'Griferias'} />
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
