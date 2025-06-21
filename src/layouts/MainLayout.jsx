// src/layouts/MainLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { Toaster } from 'react-hot-toast';
import Footer from '../components/footer';
import { useAuth } from '../context/AuthContext'; // Ganti dengan useSettings jika tema ada di sana

const MainLayout = () => {
  // Asumsi tema dikelola oleh AuthContext atau SettingsContext
  // const { theme } = useSettings(); 
  const theme = 'dark'; // Hardcode untuk contoh, sesuaikan dengan context Anda

  return (
    <div className={theme}>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: theme === 'dark' ? '#334155' : '#ffffff',
            color: theme === 'dark' ? '#ffffff' : '#0f172a',
          },
        }}
      />
      <div className="flex min-h-screen bg-white dark:bg-slate-900 text-slate-800 dark:text-white">
        <Sidebar />
        <main className="flex-1 p-6 lg:p-10">
          <Outlet /> {/* <-- Konten halaman akan dirender di sini */}

          <Footer/>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;