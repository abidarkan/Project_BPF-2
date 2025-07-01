import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Layout & Halaman
import MainLayout from "./layouts/MainLayout";
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ProtectedRoute from "./components/ProtectedRoute";

import WeatherPage from "./pages/WeatherPage.jsx";
import MapPage from "./pages/MapPage";
import SettingsPage from "./pages/SettingsPage";
import AdminPage from "./pages/AdminPage";
import AboutPage from "./pages/AboutPage";
import ErrorPage from "./pages/ErrorPage";
import ContactPage from "./pages/ContactPage"; // <-- Impor halaman baru
import AdminMessagesPage from "./pages/AdminMessagesPage"; // <-- Impor halaman baru

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
        <Route index element={<Navigate to="weather/Pekanbaru" replace />} />
        <Route path="weather/:cityName" element={<WeatherPage />} />
        <Route path="map" element={<MapPage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="contact" element={<ContactPage />} /> {/* <-- Tambahkan rute ini */}
        
        {/* Rute Khusus Admin */}
        <Route path="admin" element={<AdminPage />} />
        <Route path="admin/messages" element={<AdminMessagesPage />} /> {/* <-- Tambahkan rute ini */}
      </Route>

      {/* Rute Fallback / 404 */}
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default App;