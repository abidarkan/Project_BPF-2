// src/layouts/MainLayout.jsx
import React, { useState, useContext } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { SettingsContext } from '../context/SettingsContext';
import { Toaster } from 'react-hot-toast'; // <-- 1. Impor Toaster

const MainLayout = () => {
  const [userRole, setUserRole] = useState('guest');
  const { theme } = useContext(SettingsContext);

  return (
    <div className={theme}>
      {/* --- 2. Tambahkan Toaster di sini --- */}
      <Toaster 
        position="top-right"
        toastOptions={{
          className: '',
          duration: 3000,
          style: {
            background: theme === 'dark' ? '#334155' : '#ffffff',
            color: theme === 'dark' ? '#ffffff' : '#0f172a',
          },
        }}
      />
      <div className="relative flex min-h-screen bg-white dark:bg-slate-900 text-slate-800 dark:text-white">
        <Sidebar userRole={userRole} setUserRole={setUserRole} />
        <main className="flex-1 p-6 lg:p-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;