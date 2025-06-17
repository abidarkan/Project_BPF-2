// src/pages/SettingsPage.jsx
import React, { useContext } from 'react';
import { SettingsContext } from '../context/SettingsContext';
import { BsSunFill, BsMoonFill, BsThermometer } from 'react-icons/bs';

const SettingsPage = () => {
  const { units, setUnits, theme, setTheme } = useContext(SettingsContext);

  const handleUnitChange = (unit) => {
    setUnits(unit);
  };

  const handleThemeChange = (selectedTheme) => {
    setTheme(selectedTheme);
  };

  return (
    <div className="animate-fade-in-up">
      <h1 className="text-3xl font-bold mb-8">Pengaturan</h1>

      {/* Pengaturan Satuan Suhu */}
      {/* --- PERUBAHAN DI SINI --- */}
      <div className="bg-slate-100 dark:bg-slate-800 p-6 rounded-2xl mb-6 shadow-lg dark:shadow-none">
        <div className="flex items-center gap-4 mb-4">
          <BsThermometer className="text-2xl text-blue-500 dark:text-blue-400" />
          <h2 className="text-xl font-bold">Satuan Suhu</h2>
        </div>
        <div className="flex gap-2 bg-slate-200 dark:bg-slate-700 p-1 rounded-full">
          <button
            onClick={() => handleUnitChange('metric')}
            className={`w-full p-2 rounded-full font-semibold transition-colors text-slate-600 dark:text-slate-300 ${
              units === 'metric' ? 'bg-blue-600 !text-white' : 'hover:bg-slate-300 dark:hover:bg-slate-600'
            }`}
          >
            Celsius (°C)
          </button>
          <button
            onClick={() => handleUnitChange('imperial')}
            className={`w-full p-2 rounded-full font-semibold transition-colors text-slate-600 dark:text-slate-300 ${
              units === 'imperial' ? 'bg-blue-600 !text-white' : 'hover:bg-slate-300 dark:hover:bg-slate-600'
            }`}
          >
            Fahrenheit (°F)
          </button>
        </div>
      </div>

      {/* Pengaturan Tema */}
      {/* --- PERUBAHAN DI SINI --- */}
      {/* <div className="bg-slate-100 dark:bg-slate-800 p-6 rounded-2xl shadow-lg dark:shadow-none">
        <div className="flex items-center gap-4 mb-4">
          <BsSunFill className="text-2xl text-yellow-500 dark:text-yellow-400" />
          <h2 className="text-xl font-bold">Tema Tampilan</h2>
        </div>
        <div className="flex gap-2 bg-slate-200 dark:bg-slate-700 p-1 rounded-full">
          <button
            onClick={() => handleThemeChange('light')}
            className={`w-full p-2 rounded-full font-semibold transition-colors flex items-center justify-center gap-2 ${
              theme === 'light' ? 'bg-white text-slate-800 shadow-md' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600'
            }`}
          >
            <BsSunFill /> Terang
          </button>
          <button
            onClick={() => handleThemeChange('dark')}
            className={`w-full p-2 rounded-full font-semibold transition-colors flex items-center justify-center gap-2 ${
              theme === 'dark' ? 'bg-blue-600 text-white' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600'
            }`}
          >
            <BsMoonFill /> Gelap
          </button>
        </div>
      </div> */}
    </div>
  );
};

export default SettingsPage;