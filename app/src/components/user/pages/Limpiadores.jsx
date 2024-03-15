import React, { useEffect, useState } from "react";
import {  CardSubcategorias} from "../cards";
import { Link } from "react-router-dom";
import { TiShoppingCart } from "react-icons/ti";
import { useCarShop } from "../../../hook";
import {Migajas} from '../migajas/Migajas'


export const Limpiadores = () => {
  const [cartItemCount, setCartItemCount] = useState(0);
  const { cartItems } = useCarShop();

  useEffect(() => {
    setCartItemCount(cartItems.length);
  }, [cartItems]);
  return (
    <>
      <section>
        <div className="migajas">
         <Migajas categoriaRuta={'Construccion y remodelacion'} subcategoriaRuta={'Limpiadores'} />
        </div>
        <div className="container-productos">
          <div className="contenedor-grid-products">
            <div className="content-text">
              <h1>limpidores final obra</h1>
              <h2>
                Encuantra soluciones eficaces para dejar tus espacios
                implecables despues de la contruccion.
              </h2>
              <p>
                Diseñados para eliminar residuos de obra de manera eficaz,
                nuestros productos te ayudarán a destacar la calidad de tu
                trabajo.
              </p>
            </div>
            <CardSubcategorias RutaSubCategoria={'limpiadores'} nombreSubcategoria={'Limpiadores'} unidad={'UN'}/>
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
