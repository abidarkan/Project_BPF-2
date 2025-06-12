// src/context/FavoritesContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import defaultFavorites from '../data/favoriteCities.json';

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favoriteCities, setFavoriteCities] = useState([]);

  // Efek ini berjalan sekali saat aplikasi dimuat
  useEffect(() => {
    // Coba ambil data dari localStorage
    const savedFavorites = localStorage.getItem('favoriteCities');
    if (savedFavorites) {
      setFavoriteCities(JSON.parse(savedFavorites));
    } else {
      // Jika tidak ada, gunakan data dari file .json
      setFavoriteCities(defaultFavorites);
    }
  }, []);

  // Efek ini berjalan setiap kali daftar favorit berubah
  useEffect(() => {
    // Simpan daftar favorit ke localStorage
    localStorage.setItem('favoriteCities', JSON.stringify(favoriteCities));
  }, [favoriteCities]);

  const addFavorite = (city) => {
    if (!favoriteCities.includes(city)) {
      setFavoriteCities([...favoriteCities, city]);
    }
  };

  const removeFavorite = (city) => {
    setFavoriteCities(favoriteCities.filter(c => c !== city));
  };

  return (
    <FavoritesContext.Provider value={{ favoriteCities, addFavorite, removeFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};