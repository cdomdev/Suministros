// DashboardAdmin.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { HomeAdmin } from "../components/admin/Home/HomeAdmin";
import { GestionUsuarios } from "../components/admin/usuarios/GestionUsuarios";
import { GestionInventary } from "../components/admin/inventario/GestionInventary";
import { HomeUser } from "../components/user/pages/HomeUser";
import { Ofertas } from "../components/admin/ofertas/Ofertas";
import { CategoriaHome } from "../components/admin/categoria/pricipales/CategoriaHome";
import { useUser } from "../hook";
import { Subcategorias } from "../components/admin/subCategorias/SubCategoria";
import { NavAdmin } from "../components/admin/Nav/NavAdmin";
import { Admin } from "../components/admin/productos";

export const DashboardAdmin = () => {
  const { isAdmin } = useUser();

  return (
    <>
      <NavAdmin />
      <Routes>
        <Route
          path="/*"
          element={
            isAdmin ? <HomeAdmin /> : <Navigate to="/suministros/home" />
          }
        />
        {isAdmin && (
          <>
            <Route index element={<HomeAdmin />} />
            <Route path="/gestion/usuarios" element={<GestionUsuarios />} />
            <Route path="/añadir/productos" element={<Admin />} />
            <Route path="/gestion/inventario" element={<GestionInventary />} />
            <Route path="/crear/ofertas" element={<Ofertas />} />
            <Route path="/ver/tienda" element={<HomeUser />} />
            <Route path="/gestionar/categorias" element={<CategoriaHome />} />
            <Route
              path="/gestionar/subcategorias"
              element={<Subcategorias />}
            />
          </>
        )}
        {!isAdmin && <Route path="/*" element={<h1> PAGE NOT FOUND</h1>} />}
      </Routes>
    </>
  );
};
