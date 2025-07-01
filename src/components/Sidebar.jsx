import React from 'react';
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { 
  BsClouds, 
  BsGeoAlt, 
  BsGear, 
  BsCloudSun, 
  BsShieldLock, 
  BsBoxArrowRight,
  BsInfoCircleFill,
  BsPinMapFill,
  BsEnvelopeFill
} from 'react-icons/bs';

const Sidebar = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Anda berhasil logout.');
      navigate('/login');
    } catch (error) {
      toast.error('Gagal untuk logout.');
    }
  };

  // --- PERUBAHAN LOGIKA DI SINI ---
  const menuItems = [
    { 
      name: 'Cuaca', 
      path: '/app/weather',
      icon: <BsCloudSun />,
      submenu: [
        { name: 'Pekanbaru', path: '/app/weather/Pekanbaru' },
        { name: 'Dumai', path: '/app/weather/Dumai' },
        { name: 'Duri', path: '/app/weather/Duri' },
        { name: 'Rengat', path: '/app/weather/Rengat' },
        // { name: 'Bangkinang', path: '/app/weather/Bangkinang' },
      ]
    },
    { name: 'Peta', icon: <BsGeoAlt />, path: '/app/map' },
    { name: 'Pengaturan', icon: <BsGear />, path: '/app/settings' },
    { name: 'Tentang', icon: <BsInfoCircleFill />, path: '/app/about' },
  ];

  // Tambahkan "Kontak Kami" hanya jika peran adalah 'user'
  if (currentUser && currentUser.user_metadata?.role === 'user') {
    menuItems.push({ name: 'Kontak Kami', icon: <BsEnvelopeFill />, path: '/app/contact' });
  }

  const isWeatherActive = location.pathname.startsWith('/app/weather');

  return (
    <div className="bg-slate-100 dark:bg-slate-800 p-4 flex flex-col items-center lg:items-start lg:w-64 sticky top-0 h-screen shadow-lg dark:shadow-none z-20">
      
      <div className="flex items-center gap-3 mb-8 p-2">
        <BsClouds className="text-3xl text-blue-500" />
        <span className="text-xl font-bold hidden lg:inline text-slate-800 dark:text-white">Weather App Riau</span>
      </div>

      <div className="flex-1 w-full overflow-y-auto pr-2">
        <nav className="flex flex-col gap-2 w-full">
          {menuItems.map((item) => (
            <div key={item.name}>
              <NavLink
                to={item.submenu ? item.submenu[0].path : item.path}
                className={() =>
                  `flex items-center gap-4 p-3 rounded-lg transition-colors text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white ${
                    (item.name === 'Cuaca' && isWeatherActive) || location.pathname === item.path ? 'bg-blue-600 !text-white shadow-md' : ''
                  }`
                }
              >
                <span className="text-2xl">{item.icon}</span>
                <span className="font-semibold hidden lg:inline">{item.name}</span>
              </NavLink>

              {item.submenu && isWeatherActive && (
                <div className="mt-2 ml-4 pl-4 border-l-2 border-slate-200 dark:border-slate-700 flex flex-col gap-1">
                  {item.submenu.map(subItem => (
                    <NavLink
                      key={subItem.name}
                      to={subItem.path}
                      className={({ isActive }) =>
                        `flex items-center gap-3 p-2 rounded-lg text-sm transition-colors ${
                          isActive 
                            ? 'bg-blue-500/80 text-white' 
                            : 'text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                        }`
                      }
                    >
                      <BsPinMapFill className="text-slate-400" />
                      <span className="font-medium hidden lg:inline truncate">{subItem.name}</span>
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>

      <div className="pt-4 w-full border-t border-slate-200 dark:border-slate-700">
        {currentUser && currentUser.user_metadata?.role === 'admin' && (
          <div className="mb-4">
            <NavLink 
              to="/app/admin" 
              className={({ isActive }) => `flex items-center gap-4 p-3 rounded-lg transition-colors w-full ${ isActive ? 'bg-green-600 !text-white' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700' }`}
            >
              <BsShieldLock className="text-2xl" />
              <span className="font-semibold hidden lg:inline">Admin Panel</span>
            </NavLink>
          </div>
        )}
        {currentUser ? (
          <div className="flex items-center gap-3 p-2">
            <div className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center text-white font-bold">
              {(currentUser.user_metadata?.fullName || currentUser.email).charAt(0).toUpperCase()}
            </div>
            <div className="hidden lg:inline overflow-hidden">
              <p className="font-bold text-sm text-slate-800 dark:text-white truncate" title={currentUser.user_metadata?.fullName || currentUser.email}>{currentUser.user_metadata?.fullName || currentUser.email}</p>
              <button onClick={handleLogout} className="text-xs text-red-500 hover:underline">
                Logout
              </button>
            </div>
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