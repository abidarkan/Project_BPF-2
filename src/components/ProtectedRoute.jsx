// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem('loggedInUser');

  if (!user) {
    // Jika tidak ada data pengguna di localStorage, arahkan ke halaman login
    return <Navigate to="/login" replace />;
  }

  // Jika ada data pengguna, tampilkan halaman yang diminta
  return children;
};

export default ProtectedRoute;