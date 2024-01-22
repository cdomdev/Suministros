import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import {
  HomeUser,
  Productos,
  Ofertas,
  Nosotros,
  Pinturas,
  CarShopInfo,
} from "../components/user/pages";
import { RecoveryPage } from "../components/user/pages/RecoveryPage";
import { PrivateRoute } from "../auth/Auth";
import { DashboardAdmin } from "./DashBoardAdmin";
import { Pegantes } from "../components/user/pages/Pegantes";
import { Limpiadores } from "../components/user/pages/Limpiadores";
import { Entrega } from "../components/user/pages/Entrega";
import { LoginModal } from "../components/user/autenticacion/LoginModal";
import { PedidosPage } from "../components/user/pages/PedidosPage";

export const DashboardUser = () => {
  return (
    <Routes>
      <Route index element={<HomeUser />} />
      <Route path="/suministros/home" element={<HomeUser />} />
      <Route path="/suministros/productos" element={<Productos />} />
      <Route path="/suministros/ofertas" element={<Ofertas />} />
      <Route path="/suministros/nosotros" element={<Nosotros />} />
      <Route path="/suministros/recovery-password" element={<RecoveryPage />} />
      <Route path="/categoria/pinturas" element={<Pinturas />} />
      <Route path="/categoria/pegantes" element={<Pegantes />} />
      <Route path="/categoria/limpiadores" element={<Limpiadores />} />
      <Route path="/suministros/car" element={<CarShopInfo />} />
      <Route path="/suministros/entrega" element={<Entrega />} />
      <Route path="/suministros/login" element={< LoginModal />} />
      <Route path="/suministros/user/pedidos" element={< PedidosPage />} />



      {/* Rutas del administrador */}
      <Route path="/admin/*" element={<DashboardAdmin />} />
    </Routes>
  );
};
