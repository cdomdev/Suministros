import React, { useState, useRef, useEffect } from "react";
import { useCarShop } from "../../../../hook/CarShopContext";
import { useNavigate } from "react-router-dom";
import { PiShoppingCartSimpleThin } from "react-icons/pi";

export const CarShop = React.forwardRef(() => {
  const [cartItemCount, setCartItemCount] = useState(0);
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
        {cartItemCount > 0 && (
          <div className="insignia-car">{cartItemCount}</div>
        )}
      </div>
    </>
  );
});
