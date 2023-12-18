// DashboardAdmin.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { HomeAdmin } from '../components/admin/HomeAdmin';
import { GestionUsuarios } from '../components/admin/GestionUsuarios';
import {Admin } from '../components/admin/Admin'
import { GestionInventary } from '../components/admin/GestionInventary';
import {HomeUser} from '../pages'
import {Category} from '../components/admin/Category'

export const DashboardAdmin = () => {
  return (
    <Routes>
      <Route index  element={<HomeAdmin/>} />
      <Route path='/gestion/usuarios' element={<GestionUsuarios/>} />
      <Route path='/añadir/productos' element={<Admin/>} />
      <Route path='/gestion/categorias' element={<Category/>} />
      <Route path='/gestion/inventario' element={<GestionInventary/>} />
      <Route path='/ver/tienda' element={<HomeUser/>} />
    </Routes>
  );
};
