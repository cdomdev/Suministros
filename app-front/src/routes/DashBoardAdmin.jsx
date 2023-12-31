// DashboardAdmin.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { HomeAdmin } from '../components/admin/Home/HomeAdmin';
import { GestionUsuarios } from '../components/admin/usuarios/GestionUsuarios';
import {Admin } from '../components/admin/agregarProductos/Admin'
import { GestionInventary } from '../components/admin/inventario/GestionInventary';
import {HomeUser} from '../pages'
import {Category} from '../components/admin/categoria/Category'
import { Ofertas } from '../components/admin/ofertas/Ofertas';

export const DashboardAdmin = () => {
  return (
    <Routes>
      <Route index  element={<HomeAdmin/>} />
      <Route path='/gestion/usuarios' element={<GestionUsuarios/>} />
      <Route path='/añadir/productos' element={<Admin/>} />
      <Route path='/gestion/categorias' element={<Category/>} />
      <Route path='/gestion/inventario' element={<GestionInventary/>} />
      <Route path='/crear/ofertas' element={<Ofertas/>} />
      <Route path='/ver/tienda' element={<HomeUser/>} />
    </Routes>
  );
};
