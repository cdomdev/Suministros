
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { isAdmin} from './Auth';

export const AdminValidate = ({element, path}) =>{
return isAdmin() ? element: <Navigate to={'/home-admin'} />
}
