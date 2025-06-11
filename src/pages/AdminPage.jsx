// src/pages/AdminPage.jsx
import React from 'react';
import { BsPeopleFill, BsBarChartFill, BsGlobe } from 'react-icons/bs';

const StatCard = ({ icon, title, value, color }) => (
  <div className={`bg-slate-800 p-6 rounded-2xl flex items-center gap-6 border-l-4 ${color}`}>
    <span className="text-4xl text-white">{icon}</span>
    <div>
      <p className="text-slate-400">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  </div>
);


const AdminPage = () => {
  return (
    <div className="animate-fade-in-up">
      <h1 className="text-3xl font-bold text-white mb-6">Admin Dashboard</h1>
      
      {/* Kartu Statistik */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StatCard icon={<BsPeopleFill />} title="Total Pengguna" value="1,402" color="border-blue-500" />
        <StatCard icon={<BsBarChartFill />} title="Panggilan API Hari Ini" value="2,345" color="border-green-500" />
        <StatCard icon={<BsGlobe />} title="Kota Terdaftar" value="78" color="border-purple-500" />
      </div>

      {/* Placeholder untuk tabel atau fitur lain */}
      <div className="bg-slate-800 p-6 rounded-2xl">
        <h2 className="text-xl font-bold mb-4">Manajemen Pengguna</h2>
        <p className="text-slate-400">Tabel dan fitur manajemen pengguna akan ditampilkan di sini.</p>
        <div className="mt-4 h-48 bg-slate-700/50 rounded-lg flex items-center justify-center">
          <p className="text-slate-500">Konten Admin</p>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;