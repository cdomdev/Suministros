// DashboardAdmin.jsx
import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useUser } from "../hook";
import {
  GestionUsuarios,
  Admin,
  CategoriaHome,
  GestionInventary,
  NavAdmin,
  Ofertas,
  Subcategorias,
  HomeAdmin,
  NotExisting,
  Pedidos,
} from "../components/admin";

export const DashboardAdmin = () => {
  const { isAdmin, setIsAdmin } = useUser();

  useEffect(() => {
    const adminOnly = localStorage.getItem("HttpOnlyAdmin");
    if (adminOnly) {
      setIsAdmin(true);
    }
  }, [isAdmin]);
  return (
    <>
      {isAdmin && <NavAdmin />}
      <Routes>
        {isAdmin && (
          <>
            <Route index element={<HomeAdmin />} />
            <Route path="/gestion/usuarios" element={<GestionUsuarios />} />
            <Route path="/añadir/productos" element={<Admin />} />
            <Route path="/gestion/inventario" element={<GestionInventary />} />
            <Route path="/crear/ofertas" element={<Ofertas />} />
            <Route path="/gestionar/categorias" element={<CategoriaHome />} />
            <Route
              path="/gestionar/subcategorias"
              element={<Subcategorias />}
            />
            <Route path="/gestionar/pedidos" element={<Pedidos />} />
          </>
        )}
        {!isAdmin && <Route path="/*" element={<NotExisting />} />}
      </Routes>
    </>
  );
};
