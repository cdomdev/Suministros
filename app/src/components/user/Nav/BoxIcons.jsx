import React from "react";
import { CarShop } from "../carShop";
import { Pedidos } from "../pedidos/Pedidos";
import { Perfil } from "./Perfil";

export const BoxIcons = () => {
  return (
    <div className="content-icons-nav">
      <div className="pedidos">
        <Pedidos />
      </div>
      <div className="car">
        <CarShop />
      </div>
      <div className="perfil">
        <Perfil />
      </div>
    </div>
  );
};
