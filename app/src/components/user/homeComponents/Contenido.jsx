import React, {useState, useEffect} from "react";
import { CategoriasCards } from "./CategoriasItems";
import { TiShoppingCart } from "react-icons/ti";
import { useCarShop } from "../../../hook";
import { Link } from "react-router-dom";
import { TbTruckDelivery } from "react-icons/tb";

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
            Haz de tu hogar un espacio unico, aqui encontraras Sanitarios, pinturas y mas productos para remodelar tus esapcios.
          </h1>
        </div>
        <h2>Visita nuestras categorias</h2>
        <div className="box-products-home">
          <CategoriasCards/>
        </div>
        <div>
          <p>
            Somos la marca de remodelación de los colombianos, con una tienda
            virtual para que compres fácil y rápido, con una amplia red de
            distribución por todo el país. Ofrecemos una
            amplia variedad de productos para que puedas encontrar exactamente
            lo que necesitas: pinturas, materiales de construcción y más. Somos
            distribuidores de marcas como Corona SAS y Listo SAS.
          </p>
        </div>
        <p className="jumping-text">¡Tu visión, nuestra misión!</p>
        <div className="container">
          <div className="svg-home">
            <div className="svg-store">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="5em"
                height="5em"
                viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M12 18H6v-4h6m9 0v-2l-1-5H4l-1 5v2h1v6h10v-6h4v6h2v-6m0-10H4v2h16V4Z"
                />
              </svg>
              <h5 className="text-svg-store">Recogida en tienda</h5>
              <span className="text-svg">
                Recoge tus compras en nuestra tienda
              </span>
            </div>
            <div className="svg-truck">
            <TbTruckDelivery className="animated-truck" />
              <h5 className="text-svg-truck">Envio a domicilio</h5>
              <span className="text-svg">
                Tu pedido hasta la puerta de tu casa
              </span>
            </div>
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
