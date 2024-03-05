import React from "react";
import { Sidebar } from "../pedidos/sidebar/Sidebar";
import { Outlet } from "react-router";

export const Pedidos = () => {
  
  return (
    <div>
      <section>
        <div className="main-pedidos">
          <div className="sidebar">
            <Sidebar  />
          </div>
          <div className="body">
            <Outlet  />
          </div>
        </div>
      </section>
    </div>
  );
};
