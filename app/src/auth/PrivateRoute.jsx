
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { isAuthenticated } from './Auth';

export const PrivateRoute = ({ element, path }) => {
  return isAuthenticated() ? element : <Navigate to="/home" />;
};

