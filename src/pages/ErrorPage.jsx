// src/pages/ErrorPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white text-center p-4">
      <h1 className="text-6xl font-bold text-blue-500">404</h1>
      <h2 className="text-3xl font-semibold mt-4 mb-2">Halaman Tidak Ditemukan</h2>
      <p className="text-slate-400 mb-8">Maaf, halaman yang Anda cari tidak ada atau telah dipindahkan.</p>
      <Link 
        to="/" 
        className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
      >
        Kembali ke Beranda
      </Link>
    </div>
  );
};

export default ErrorPage;