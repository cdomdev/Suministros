import React from "react";
import { Routes, Route } from "react-router-dom";
import {
  HomeUser,
  Productos,
  Ofertas,
  Nosotros,
  Pinturas,
  CarShopInfo,
  RecoveryPage,
  DetallesProducto,
  Entrega,
  Espejos,
  Griferias,
  Lavamanos,
  Lavaplatos,
  Limpiadores,
  Paredes,
  PedidosPage,
  Pegantes,
  Pisos,
  Sanitarios,
  BuscadorPage,
  PagoPage,
} from "../components/user/pages";

import { LoginModal } from "../components/user/autenticacion/LoginModal";
import { NavCustome } from "../components/user/Nav/NavCustome";

export const DashboardUser = () => {
  return (
    <>
      <NavCustome />
      <Routes>
        <Route index element={<HomeUser />} />
        {/* pages de productos*/}
        <Route path="/suministros/home" element={<HomeUser />} />
        <Route path="/suministros/productos" element={<Productos />} />
        <Route path="/suministros/ofertas" element={<Ofertas />} />
        <Route path="/suministros/nosotros" element={<Nosotros />} />
        <Route path="/suministros/sanitarios" element={<Sanitarios />} />
        <Route path="/suministros/griferias" element={<Griferias />} />
        <Route path="/suministros/espejos" element={<Espejos />} />
        <Route path="/suministros/pinturas" element={<Pinturas />} />
        <Route path="/suministros/pegantes" element={<Pegantes />} />
        <Route path="/suministros/limpiadores" element={<Limpiadores />} />
        <Route path="/suministros/lavaplatos" element={<Lavaplatos />} />
        <Route path="/suministros/lavamanos" element={<Lavamanos />} />
        <Route path="/suministros/pisos" element={<Pisos />} />
        <Route path="/suministros/paredes" element={<Paredes />} />
        <Route path="/suministros/categoria/pinturas" element={<Pinturas />} />
        <Route path="/suministros/categoria/pegantes" element={<Pegantes />} />
        <Route
          path="/suministros/resultados-busqueda/:nombre"
          element={<BuscadorPage />}
        />
        <Route
          path="/suministros/categoria/limpiadores"
          element={<Limpiadores />}
        />

        {/* validacion */}
        <Route path="/suministros/login" element={<LoginModal />} />

        {/* recuperar contraseña */}
        <Route
          path="/suministros/recovery-password"
          element={<RecoveryPage />}
        />
        {/* pages de servicio  */}
        <Route path="/suministros/car" element={<CarShopInfo />} />
        <Route path="/suministros/entrega" element={<Entrega />} />
        <Route path="/suministros/pago" element={<PagoPage />} />
        <Route path="/suministros/user/pedidos" element={<PedidosPage />} />
        <Route
          path="/suministros/details/:descripcion"
          element={<DetallesProducto />}
        />
      </Routes>
    </>
  );
};
