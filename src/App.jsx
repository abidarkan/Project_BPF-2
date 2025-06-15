// src/App.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Layout & Halaman
import MainLayout from "./layouts/MainLayout";
import LoginPage from './pages/auth/LoginPage';
import ProtectedRoute from "./components/ProtectedRoute"; // <-- Impor komponen baru

// Halaman-halaman yang akan dilindungi
import WeatherPage from "./pages/WeatherPage.jsx";
import CitiesPage from "./pages/CitiesPage";
import MapPage from "./pages/MapPage";
import SettingsPage from "./pages/SettingsPage";
import AdminPage from "./pages/AdminPage";
import ErrorPage from "./pages/ErrorPage";
import AboutPage from "./pages/AboutPage"; // <-- Impor halaman baru

function App() {
  return (
    <Routes>
      {/* Rute Publik: Login adalah halaman utama dan bisa diakses siapa saja */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<LoginPage />} /> 

      {/* Rute Terlindungi: Semua rute di bawah ini hanya bisa diakses setelah login */}
      <Route 
        path="/app" // Kita gunakan prefix /app untuk semua halaman internal
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="weather/Pekanbaru" replace />} />
        <Route path="weather/:cityName" element={<WeatherPage />} />
        <Route path="cities" element={<CitiesPage />} />
        <Route path="map" element={<MapPage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="admin" element={<AdminPage />} />
        <Route path="about" element={<AboutPage />} />
      </Route>

      {/* Rute Fallback / 404 */}
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default App;