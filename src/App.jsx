import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Layout Utama
import MainLayout from "./layouts/MainLayout";

// Halaman-Halaman
import WeatherPage from "./pages/WeatherPage.jsx";
import CitiesPage from "./pages/CitiesPage";
import MapPage from "./pages/MapPage";
import SettingsPage from "./pages/SettingsPage";
import AdminPage from "./pages/AdminPage";

import ErrorPage from "./pages/ErrorPage"; 

function App() {
  return (
    <Routes>
      {/* Semua rute di bawah ini akan menggunakan MainLayout (yang memiliki Sidebar) */}
      <Route path="/" element={<MainLayout />}>
        
        {/* Rute Indeks: Saat pengguna membuka "/", langsung arahkan ke cuaca Pekanbaru */}
        <Route 
          index 
          element={<Navigate to="/weather/Pekanbaru" replace />} 
        />
        
        {/* Rute Dinamis untuk Cuaca: bisa menerima nama kota apa pun */}
        <Route path="weather/:cityName" element={<WeatherPage />} />
        
        {/* Rute untuk halaman lain */}
        <Route path="cities" element={<CitiesPage />} />
        <Route path="map" element={<MapPage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="admin" element={<AdminPage />} />

      </Route>

      {/* Rute Fallback / 404: Jika URL tidak cocok dengan rute di atas */}
      {/* Diletakkan di luar MainLayout agar tidak menampilkan Sidebar */}
      <Route path="*" element={<ErrorPage />} />

    </Routes>
  );
}

export default App;