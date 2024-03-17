import React, { useState, useEffect } from "react";
import { CategoriasCards } from "./CategoriasItems";
import { useCarShop } from "../../../hook";
import { Link } from "react-router-dom";
import { TiShoppingCart } from "react-icons/ti";
import { TbTruckDelivery } from "react-icons/tb";
import { Shop } from "../../../assets/icons/iconos";

export const Contenido = () => {
  const [cartItemCount, setCartItemCount] = useState(0);
  const { cartItems } = useCarShop();

  useEffect(() => {
    setCartItemCount(cartItems.length);
  }, [cartItems]);

  return (
    <>
      <div className="contenido">
        <div>
          <h1>
            Haz de tu hogar un espacio unico, aqui encontraras Sanitarios,
            pinturas y mas productos para remodelar tus esapcios.
          </h1>
        </div>
        <h2>Visita nuestras categorias</h2>
        <div className="box-products-home">
          <CategoriasCards />
        </div>
        <div>
          <p>
            Somos la marca de remodelación de los colombianos, con una tienda
            virtual para que compres fácil y rápido, con una amplia red de
            distribución por todo el país. Ofrecemos una amplia variedad de
            productos para que puedas encontrar exactamente lo que necesitas:
            pinturas, materiales de construcción y más. Somos distribuidores de
            marcas como Corona SAS y Listo SAS.
          </p>
        </div>
        <p className="jumping-text">¡Tu visión, nuestra misión!</p>
        <div className="svg">
          <div className="svg-content">
            <Shop />
            <h5 className="text-svg-store">Recogida en tienda</h5>
            <span className="text-svg">
              Recoge tus compras en nuestra tienda
            </span>
          </div>
          <div className="svg-content">
            <TbTruckDelivery className="animated-truck" />
            <h5 className="text-svg-truck">Envio a domicilio</h5>
            <span className="text-svg">
              Tu pedido hasta la puerta de tu casa
            </span>
          </div>
        </div>
      </div>
      {cartItemCount > 0 && (
        <Link to="/suministros/car" className="link">
          <div class="icon-container">
            <div className="insignia">{cartItemCount}</div>
            <TiShoppingCart className="icon-car" />
          </div>
        </Link>
      )}
    </>
  );
};
