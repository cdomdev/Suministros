import React from "react";
import { BsBoxSeam } from "react-icons/bs";
import { useNavigate } from "react-router";

export const Pedidos = () => {
  const navigate = useNavigate();

  const navigatePage = () => {
    navigate("/suministros/user/pedidos");
  };
  return (
    <div>
      <BsBoxSeam className="box-pedidos" onClick={navigatePage} />
      <span>PEDIDOS</span>
    </div>
  );
};
