// src/pages/CitiesPage.jsx
import React from 'react';
import { BsPinMapFill } from 'react-icons/bs';

const CitiesPage = () => {
  const riauCities = [
    { name: 'Pekanbaru', description: 'Ibu kota dan kota terbesar di Provinsi Riau.' },
    { name: 'Dumai', description: 'Kota pelabuhan utama dengan industri minyak yang signifikan.' },
    { name: 'Duri', description: 'Terkenal sebagai pusat industri minyak dan gas di Riau.' },
    { name: 'Rengat', description: 'Ibu kota Kabupaten Indragiri Hulu, memiliki sejarah kerajaan.' },
    { name: 'Tembilahan', description: 'Ibu kota Kabupaten Indragiri Hilir, dikenal dengan kebun kelapanya.' },
    { name: 'Bangkinang', description: 'Ibu kota Kabupaten Kampar, dekat dengan Candi Muara Takus.' },
    { name: 'Siak Sri Indrapura', description: 'Kota bersejarah dengan Istana Siak yang megah.' },
    { name: 'Pangkalan Kerinci', description: 'Ibu kota Kabupaten Pelalawan, pusat industri pulp dan kertas.' },
  ];

  return (
    <div className="animate-fade-in-up">
      <h1 className="text-3xl font-bold mb-6">Kota & Kabupaten di Riau</h1>
      
      {/* --- PERUBAHAN DI SINI --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {riauCities.map((city) => (
          <div key={city.name} className="bg-slate-100 dark:bg-slate-800 p-6 rounded-2xl shadow-lg dark:shadow-none">
            <div className="flex items-center gap-3 mb-2">
              <BsPinMapFill className="text-blue-500 dark:text-blue-400" />
              <h2 className="text-xl font-bold text-slate-800 dark:text-white">{city.name}</h2>
            </div>
            <p className="text-slate-600 dark:text-slate-400">{city.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CitiesPage;