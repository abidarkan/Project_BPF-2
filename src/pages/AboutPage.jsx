// src/pages/AboutPage.jsx
import React from 'react';
// --- PERUBAHAN DI BARIS IMPOR DI BAWAH INI ---
import { FaReact } from 'react-icons/fa';
import { SiVite, SiTailwindcss, SiLeaflet } from 'react-icons/si';
import { BsCloudyFill, BsBarChartFill } from 'react-icons/bs'; // Hapus SiRecharts, tambahkan BsBarChartFill

const TechCard = ({ icon, name, description }) => (
  <div className="bg-slate-200 dark:bg-slate-700/50 p-4 rounded-lg flex items-center gap-4">
    <span className="text-3xl text-blue-500">{icon}</span>
    <div>
      <h3 className="font-bold text-slate-800 dark:text-white">{name}</h3>
      <p className="text-sm text-slate-600 dark:text-slate-400">{description}</p>
    </div>
  </div>
);

const AboutPage = () => {
  return (
    <div className="animate-fade-in-up space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">Tentang Weathers App Riau</h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          Aplikasi dashboard cuaca khusus Riau yang menyediakan data cuaca real-time dan ramalan.
        </p>
      </div>

      <div className="bg-slate-100 dark:bg-slate-800 p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Misi Kami</h2>
        <p className="text-slate-600 dark:text-slate-300">
          Misi kami adalah menyajikan data cuaca disekitaran Riau.
        </p>
      </div>
      
      <div className="bg-slate-100 dark:bg-slate-800 p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Pengembang</h2>
        <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-slate-700 rounded-full flex items-center justify-center">
                <span className="text-3xl">👨‍💻</span>
            </div>
            <div>
                <h3 className="text-xl font-bold">Abid Asyam Arkan</h3>
                <p className="text-slate-600 dark:text-slate-400">Full-Stack Developer & UI/UX </p>
            </div>
        </div>
      </div>

      <div className="bg-slate-100 dark:bg-slate-800 p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Teknologi yang Digunakan</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <TechCard icon={<FaReact />} name="React" description="Library JavaScript untuk membangun antarmuka pengguna." />
          <TechCard icon={<SiVite />} name="Vite" description="Build tool modern yang sangat cepat untuk pengembangan web." />
          <TechCard icon={<SiTailwindcss />} name="Tailwind CSS" description="Framework CSS utility-first untuk desain yang cepat dan kustom." />
          {/* --- PERUBAHAN DI BARIS IKON DI BAWAH INI --- */}
          <TechCard icon={<BsBarChartFill />} name="Recharts" description="Library charting untuk membuat grafik yang indah dan interaktif." />
          <TechCard icon={<SiLeaflet />} name="Leaflet" description="Library JavaScript untuk peta interaktif yang ramah mobile." />
          <TechCard icon={<BsCloudyFill />} name="OpenWeatherMap API" description="Sumber data untuk semua informasi cuaca dan ramalan." />
        </div>
      </div>
    </div>
  );
};

export default AboutPage;