// src/pages/CitiesPage.jsx
import React, { useState, useContext } from 'react';
import { FavoritesContext } from '../context/FavoritesContext';
import { BsTrash, BsPlusCircleFill } from 'react-icons/bs';

const CitiesPage = () => {
  // Ambil semua yang kita butuhkan dari FavoritesContext
  const { favoriteCities, addFavorite, removeFavorite } = useContext(FavoritesContext);
  
  // State lokal hanya untuk mengelola input dari form
  const [newCity, setNewCity] = useState('');

  const handleAddCity = (e) => {
    e.preventDefault(); // Mencegah form dari refresh halaman
    if (newCity.trim()) { // Pastikan input tidak kosong
      addFavorite(newCity.trim()); // Tambahkan kota baru
      setNewCity(''); // Kosongkan kembali input field
    }
  };

  return (
    <div className="animate-fade-in-up">
      <h1 className="text-3xl font-bold mb-8">Kelola Kota Favorit</h1>

      {/* Form untuk Menambah Kota Baru */}
      <div className="bg-slate-100 dark:bg-slate-800 p-6 rounded-2xl mb-8 shadow-lg dark:shadow-none">
        <h2 className="text-xl font-bold mb-4">Tambah Kota Baru</h2>
        <form onSubmit={handleAddCity} className="flex gap-4">
          <input
            type="text"
            value={newCity}
            onChange={(e) => setNewCity(e.target.value)}
            placeholder="Ketik nama kota..."
            className="w-full px-4 py-2 rounded-lg bg-white dark:bg-slate-700 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            <BsPlusCircleFill />
            <span>Tambah</span>
          </button>
        </form>
      </div>

      {/* Daftar Kota Favorit Saat Ini */}
      <div className="bg-slate-100 dark:bg-slate-800 p-6 rounded-2xl shadow-lg dark:shadow-none">
        <h2 className="text-xl font-bold mb-4">Daftar Favorit</h2>
        <div className="space-y-3">
          {favoriteCities.length > 0 ? (
            favoriteCities.map(city => (
              <div 
                key={city} 
                className="flex justify-between items-center bg-slate-200 dark:bg-slate-700/50 p-3 rounded-lg"
              >
                <span className="font-medium">{city.split(',')[0]}</span>
                <button 
                  onClick={() => removeFavorite(city)}
                  className="text-red-500 hover:text-red-700 dark:hover:text-red-400 transition-colors text-xl"
                  title={`Hapus ${city.split(',')[0]}`}
                >
                  <BsTrash />
                </button>
              </div>
            ))
          ) : (
            <p className="text-slate-500 dark:text-slate-400">Anda belum memiliki kota favorit.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CitiesPage;