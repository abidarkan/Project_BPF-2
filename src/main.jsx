// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from "react-router-dom";
import { SettingsProvider } from './context/SettingsContext';
import { FavoritesProvider } from './context/FavoritesContext'; // <-- Impor provider baru

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SettingsProvider>
      {/* Bungkus dengan FavoritesProvider */}
      <FavoritesProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </FavoritesProvider>
    </SettingsProvider>
  </React.StrictMode>,
)