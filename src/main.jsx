// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from "react-router-dom";
import { SettingsProvider } from './context/SettingsContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { UserProvider } from './context/UserContext';
// import { AuthProvider } from './context/AuthContext'; // <-- HAPUS BARIS INI

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Hapus AuthProvider dari sini juga */}
    <SettingsProvider>
      <FavoritesProvider>
        <UserProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </UserProvider>
      </FavoritesProvider>
    </SettingsProvider>
  </React.StrictMode>,
)