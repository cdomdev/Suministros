import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useUserData } from '../hook/UserDataProvider';

export const PrivateRoute = ({ roleAllowed, ...props }) => {
  const { role } = useUserData();

  if (role === roleAllowed) {
    return <Route {...props} />;
  } else {
    return <Navigate to="/unauthorized" />; // Redirige a una página de acceso no autorizado
  }
};


export const isAuthenticated = () =>{
  return localStorage.getItem('userSesionToken') !== null;
}
