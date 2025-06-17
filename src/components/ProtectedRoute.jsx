// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    // Jika tidak ada pengguna yang login, arahkan ke halaman login
    return <Navigate to="/login" replace />;
  }

  // Jika ada pengguna, tampilkan halaman yang diminta
  return children;
};

export default ProtectedRoute;