// src/context/SettingsContext.jsx
import React, { createContext, useState } from 'react';

// Membuat Context
export const SettingsContext = createContext();

// Membuat "Provider" yang akan membungkus aplikasi kita
export const SettingsProvider = ({ children }) => {
  const [units, setUnits] = useState('metric'); // 'metric' untuk Celsius, 'imperial' untuk Fahrenheit
  const [theme, setTheme] = useState('dark'); // 'dark' atau 'light'

  return (
    <SettingsContext.Provider value={{ units, setUnits, theme, setTheme }}>
      {children}
    </SettingsContext.Provider>
  );
};