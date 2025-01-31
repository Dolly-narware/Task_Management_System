import React from 'react';
import { Navigate } from 'react-router-dom';
import { getToken } from './AuthService';

const ProtectedRoute = ({ children }) => {
   
    return getToken() ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
