// src/components/Sidebar.jsx
import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
// import { auth } from '../firebase';
// import { onAuthStateChanged, signOut } from 'firebase/auth';
import { BsClouds, BsListUl, BsGeoAlt, BsGear, BsCloudSun, BsShieldLock, BsBoxArrowRight, BsInfoCircleFill } from 'react-icons/bs';

const Sidebar = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error("Gagal untuk logout", error);
    }
  };

  const menuItems = [
    { icon: <BsCloudSun />, name: 'Cuaca', path: '/app/weather/Pekanbaru' },
    { icon: <BsListUl />, name: 'Kota', path: '/app/cities' },
    { icon: <BsGeoAlt />, name: 'Peta', path: '/app/map' },
    { icon: <BsGear />, name: 'Pengaturan', path: '/app/settings' },
    { icon: <BsInfoCircleFill />, name: 'Tentang', path: '/app/about' },
  ];

  return (
    // --- PERUBAHAN DI SINI ---
    <div className="bg-slate-100 dark:bg-slate-800 p-4 flex flex-col items-center lg:items-start lg:w-56 sticky top-0 h-screen shadow-lg dark:shadow-none">
      
      {/* Logo */}
      <div className="flex items-center gap-3 mb-10 p-2">
        <BsClouds className="text-3xl text-blue-500" />
        <span className="text-xl font-bold hidden lg:inline text-slate-800 dark:text-white">Weatherly</span>
      </div>

      {/* Menu */}
      <nav className="flex flex-col gap-4 w-full flex-1">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-4 p-3 rounded-lg transition-colors text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white ${
                isActive ? 'bg-blue-600 !text-white shadow-md' : ''
              }`
            }
          >
            <span className="text-2xl">{item.icon}</span>
            <span className="font-semibold hidden lg:inline">{item.name}</span>
          </NavLink>
        ))}

        {/* Menu Admin */}
        {currentUser && currentUser.email === 'admin@example.com' && (
           <NavLink 
             to="/app/admin" 
             className={({ isActive }) => `flex items-center gap-4 p-3 mt-4 rounded-lg transition-colors text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white ${ isActive ? 'bg-green-600 text-white' : '' }`}
           >
              <BsShieldLock className="text-2xl" />
              <span className="font-semibold hidden lg:inline">Admin Panel</span>
           </NavLink>
        )}
      </nav>

      {/* Bagian Bawah Sidebar */}
      <div className="pt-4 w-full border-t border-slate-200 dark:border-slate-700">
        {currentUser ? (
          <div>
            <p className="px-3 text-xs text-slate-500 dark:text-slate-400 truncate" title={currentUser.email}>{currentUser.email}</p>
            <button onClick={handleLogout} className="w-full flex items-center gap-4 mt-2 p-3 rounded-lg text-red-500 hover:bg-red-500/10">
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