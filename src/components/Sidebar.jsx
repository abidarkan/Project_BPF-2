// src/components/Sidebar.jsx
import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { BsClouds, BsListUl, BsGeoAlt, BsGear, BsCloudSun, BsShieldLock, BsBoxArrowRight } from 'react-icons/bs';
import { BsInfoCircleFill } from 'react-icons/bs';

// import { FavoritesContext } from '../context/FavoritesContext';

const Sidebar = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
      setCurrentUser(JSON.parse(loggedInUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    setCurrentUser(null);
    navigate('/login');
  };

  // --- PERUBAHAN DI SINI: Semua path sekarang diawali dengan /app ---
  const menuItems = [
    { icon: <BsCloudSun />, name: 'Cuaca', path: '/app/weather/Pekanbaru' },
    { icon: <BsListUl />, name: 'Kota', path: '/app/cities' },
    { icon: <BsGeoAlt />, name: 'Peta', path: '/app/map' },
    { icon: <BsGear />, name: 'Pengaturan', path: '/app/settings' },
    { icon: <BsInfoCircleFill />, name: 'Tentang', path: '/app/about' },
  ];

  return (
    <div className="bg-slate-800 p-4 flex flex-col items-center lg:items-start lg:w-56 sticky top-0 h-screen">
      <div className="flex items-center gap-3 mb-10 p-2">
        <BsClouds className="text-3xl text-white" />
        <span className="text-xl font-bold hidden lg:inline">Weathers App Riau</span>
      </div>
      <nav className="flex flex-col gap-4 w-full flex-1">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) => `flex items-center gap-4 p-3 rounded-lg transition-colors text-slate-400 hover:bg-slate-700 hover:text-white ${ isActive ? 'bg-blue-600 text-white' : '' }`}
          >
            <span className="text-2xl">{item.icon}</span>
            <span className="font-semibold hidden lg:inline">{item.name}</span>
          </NavLink>
        ))}

        {currentUser && currentUser.role === 'admin' && (
           <NavLink 
             to="/app/admin" // <-- Tambahkan /app di sini juga
             className={({ isActive }) => `flex items-center gap-4 p-3 mt-4 rounded-lg transition-colors text-slate-400 hover:bg-slate-700 hover:text-white ${ isActive ? 'bg-green-600 text-white' : '' }`}
           >
              <BsShieldLock className="text-2xl" />
              <span className="font-semibold hidden lg:inline">Admin Panel</span>
           </NavLink>
        )}
      </nav>

      <div className="pt-4 w-full border-t border-slate-700">
        {currentUser ? (
          <div>
            <p className="px-3 text-xs text-slate-400 truncate" title={currentUser.email}>{currentUser.email}</p>
            <button onClick={handleLogout} className="w-full flex items-center gap-4 mt-2 p-3 rounded-lg text-slate-400 hover:bg-red-500/20 hover:text-red-400">
              <BsBoxArrowRight className="text-2xl" />
              <span className="font-semibold hidden lg:inline">Logout</span>
            </button>
          </div>
        ) : (
          <Link to="/login" className="w-full flex items-center justify-center p-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Sidebar;