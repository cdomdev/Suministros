import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PiShoppingCartSimpleThin } from "react-icons/pi";
import { useCarShop } from "../../../../hook";

export const CarShop = React.forwardRef(() => {
  const [cartItemCount, setCartItemCount] = useState(0);
  localStorage.setItem('count', cartItemCount)
  const targetRef = useRef(null);
  const { cartItems } = useCarShop();
  const navigate = useNavigate();

  useEffect(() => {
    setCartItemCount(cartItems.length);
  }, [cartItems]);

  const navigateCar = () => {
    navigate("/suministros/car");
  };

  return (
    <>
      <div ref={targetRef} className="contenedor-car">
        <PiShoppingCartSimpleThin onClick={navigateCar} className="carshop" />
        <span className="carrito">
          CARRITO
        </span>
        {cartItemCount > 0 && (
          <div className="insignia-car">{cartItemCount}</div>
        )}
      </div>
    </>
  );
});
