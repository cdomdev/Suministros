import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { TiShoppingCart } from "react-icons/ti";
import { useCarShop } from "../../../hook";
import {  CardSubcategorias } from "../cards";
import {Migajas} from '../migajas/Migajas'


export const Lavaplatos = () => {
  const [cartItemCount, setCartItemCount] = useState(0);
  const { cartItems } = useCarShop();

  useEffect(() => {
    setCartItemCount(cartItems.length);
  }, [cartItems]);
  return (
    <section>
      <div className="migajas">
        <Migajas categoriaRuta={'Cocinas'} subcategoriaRuta={'Lavaplatos'}/>
      </div>
      <div className="container-productos">
        <div className="contenedor-grid-products">
          <div className="content-text">
            <h1>Lavaplatos</h1>
            <h2>
              Encuantra la solucion perfectra para mantener utencilios limpios y
              reluciones.
            </h2>
            <p>
              Diseñados para ofrecer un rendimiento excepcional, nuestros
              lavaplatos te ayudarán a mantener tu cocina impecable con
              facilidad
            </p>
          </div>
          <CardSubcategorias RutaSubCategoria={'lavaplatos'} nombreSubcategoria={'Lavaplatos '} unidad={'UN'}/>
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
