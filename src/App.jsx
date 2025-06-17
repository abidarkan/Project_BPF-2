// src/App.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Layout & Halaman
import MainLayout from "./layouts/MainLayout";
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ProtectedRoute from "./components/ProtectedRoute";

import WeatherPage from "./pages/WeatherPage.jsx";
// import CitiesPage from "./pages/CitiesPage"; // <-- Hapus impor ini
import MapPage from "./pages/MapPage";
import SettingsPage from "./pages/SettingsPage";
import AdminPage from "./pages/AdminPage";
import AboutPage from "./pages/AboutPage";
import ErrorPage from "./pages/ErrorPage";

function App() {
  return (
    <Routes>
      {/* Rute Publik */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/" element={<Navigate to="/app/weather/Pekanbaru" replace />} />

      {/* Rute Terlindungi dengan Sidebar */}
      <Route
        path="/app"
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route path="weather/:cityName" element={<WeatherPage />} />
        {/* <Route path="cities" element={<CitiesPage />} /> */} {/* <-- Hapus rute ini */}
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