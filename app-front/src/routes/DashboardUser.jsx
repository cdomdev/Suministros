import React from 'react';
import { Routes, BrowserRouter, Route } from 'react-router-dom';
import {PrivateRoute} from '../auth/PrivateRoute';
import { HomeUser } from '../pages/HomeUser';
import { Ofertas } from '../pages/Ofertas';
import { Productos } from '../pages/Productos';
import { Nosotros } from '../pages/Nosotros';
import { CarShop } from '../pages/CarShop';
import {Admin } from '../components/admin/Admin';


export const DashboardUser = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<HomeUser />} />
        <Route path="/home" element={<HomeUser />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/ofertas" element={<Ofertas />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/car" element={<PrivateRoute element={<CarShop />} />} />
        <Route path='/admin'  element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
};



