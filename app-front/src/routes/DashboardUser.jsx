import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { HomeUser, Productos, Ofertas, Nosotros, CarShop } from "../pages";
import { PrivateRoute } from "../auth/Auth";
import {DashboardAdmin} from './DashBoardAdmin'

export const DashboardUser = () => {
  return (
    <Routes>
      <Route index element={<HomeUser />} />
      <Route path="/home" element={<HomeUser />} />
      <Route path="/productos" element={<Productos />} />
      <Route path="/ofertas" element={<Ofertas />} />
      <Route path="/nosotros" element={<Nosotros />} />
      <Route path="/car" element={<PrivateRoute element={<CarShop />} />} />

      {/* Rutas del administrador */}
      <Route path="/admin/*" element={<DashboardAdmin />} />
    </Routes>
  );
};



