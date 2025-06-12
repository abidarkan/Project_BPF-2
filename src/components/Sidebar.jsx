// src/components/Sidebar.jsx
import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { FavoritesContext } from '../context/FavoritesContext';
import { BsClouds, BsListUl, BsGeoAlt, BsGear, BsCloudSun, BsShieldLock, BsStarFill } from 'react-icons/bs';

const Sidebar = ({ userRole, setUserRole }) => {
  const { favoriteCities } = useContext(FavoritesContext);

  // --- PERUBAHAN DI SINI: Mengembalikan menu utama ke struktur yang Anda minta ---
  const menuItems = [
    { icon: <BsCloudSun />, name: 'Cuaca', path: '/weather/Pekanbaru' },
    { icon: <BsListUl />, name: 'Kota', path: '/cities' },
    { icon: <BsGeoAlt />, name: 'Peta', path: '/map' },
    { icon: <BsGear />, name: 'Pengaturan', path: '/settings' },
  ];

  const handleRoleChange = () => {
    setUserRole(prevRole => (prevRole === 'guest' ? 'admin' : 'guest'));
  };

  const getCityDisplayName = (city) => city.split(',')[0];

  return (
    <div className="bg-slate-100 dark:bg-slate-800 p-4 flex flex-col items-center lg:items-start lg:w-64 sticky top-0 h-screen shadow-lg dark:shadow-none z-20">
      
      {/* Logo */}
      <div className="flex items-center gap-3 mb-8 p-2">
        <BsClouds className="text-3xl text-blue-500" />
        <span className="text-xl font-bold hidden lg:inline text-slate-800 dark:text-white">Weatherly</span>
      </div>

      {/* Scrollable Menu Container */}
      <div className="flex-1 w-full overflow-y-auto pr-2">
        {/* Main Menu */}
        <nav className="flex flex-col gap-2 w-full">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              // Jika path adalah /weather, kita navigasi ke kota favorit pertama atau default
              to={item.name === 'Cuaca' ? `/weather/${getCityDisplayName(favoriteCities[0] || 'Pekanbaru')}` : item.path}
              className={({ isActive }) =>
                `flex items-center gap-4 p-3 rounded-lg transition-colors text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white ${
                  isActive && item.name !== 'Cuaca' ? 'bg-blue-600 !text-white shadow-md' : ''
                }`
              }
            >
              <span className="text-2xl">{item.icon}</span>
              <span className="font-semibold hidden lg:inline">{item.name}</span>
            </NavLink>
          ))}
        </nav>

        {/* Favorite Cities List */}
        <div className="mt-8">
          <h3 className="px-3 mb-2 text-xs font-semibold text-slate-400 uppercase tracking-wider hidden lg:block">Kota Favorit</h3>
          <div className="flex flex-col gap-1">
            {favoriteCities.map(city => (
              <NavLink
                key={city}
                to={`/weather/${getCityDisplayName(city)}`}
                className={({ isActive }) =>
                  `flex items-center gap-4 p-3 rounded-lg text-sm transition-colors ${
                    isActive 
                      ? 'bg-blue-500/80 text-white' 
                      : 'text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`
                }
              >
                <BsStarFill className="text-yellow-500 flex-shrink-0" />
                <span className="font-medium hidden lg:inline truncate">{getCityDisplayName(city)}</span>
              </NavLink>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="pt-4 w-full border-t border-slate-200 dark:border-slate-700">
        {userRole === 'admin' && (
          <div className="mb-4">
            <NavLink 
              to="/admin" 
              className={({ isActive }) => `flex items-center gap-4 p-3 rounded-lg transition-colors w-full ${ isActive ? 'bg-green-600 text-white' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700' }`}
            >
              <BsShieldLock className="text-2xl" />
              <span className="font-semibold hidden lg:inline">Admin Panel</span>
            </NavLink>
          </div>
        )}
        <div className="p-2 w-full">
          <button
            onClick={handleRoleChange}
            className="w-full text-center p-3 rounded-lg bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
          >
            <p className="text-sm font-bold capitalize text-slate-700 dark:text-slate-300">{userRole}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Ketuk untuk beralih</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;