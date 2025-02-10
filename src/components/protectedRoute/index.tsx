// ProtectedRoute.tsx
import React, { FC, JSX } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';

interface ProtectedRouteProps {
  redirectPath?: string;
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ redirectPath = '/login' }): JSX.Element => {

  const token = Cookies.get('token');


  if (!token) {
    return <Navigate to={redirectPath} replace />;
  }

 
  return <Outlet />;
};

export default ProtectedRoute;
