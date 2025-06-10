// src/App.jsx (Versi dengan Rute Admin)
import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import WeatherPage from "./pages/WeatherPage.jsx";
import CitiesPage from "./pages/CitiesPage";
import MapPage from "./pages/MapPage";
import SettingsPage from "./pages/SettingsPage";
import AdminPage from "./pages/AdminPage"; // <-- Impor halaman baru

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<WeatherPage />} /> 
        <Route path="weather" element={<WeatherPage />} />
        <Route path="cities" element={<CitiesPage />} />
        <Route path="map" element={<MapPage />} />
        <Route path="settings" element={<SettingsPage />} />
        
        {/* --- TAMBAHKAN RUTE INI --- */}
        <Route path="admin" element={<AdminPage />} />
        
      </Route>
    </Routes>
  );
}

export default App;