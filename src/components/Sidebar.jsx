// src/components/Sidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { BsClouds, BsListUl, BsGeoAlt, BsGear, BsCloudSun, BsShieldLock } from 'react-icons/bs';

const Sidebar = ({ userRole, setUserRole }) => {
 const menuItems = [
   { icon: <BsCloudSun />, name: 'Cuaca', path: '/weather' },
   { icon: <BsListUl />, name: 'Kota', path: '/cities' },
   { icon: <BsGeoAlt />, name: 'Peta', path: '/map' },
   { icon: <BsGear />, name: 'Pengaturan', path: '/settings' },
 ];

 const handleRoleChange = () => {
   setUserRole(prevRole => (prevRole === 'guest' ? 'admin' : 'guest'));
 };

 return (
   <div className="bg-slate-100 dark:bg-slate-800 p-4 flex flex-col items-center lg:items-start lg:w-56 sticky top-0 h-screen shadow-md dark:shadow-none">
     <div className="flex items-center gap-3 mb-10 p-2">
       <BsClouds className="text-3xl text-blue-500 dark:text-white" />
       <span className="text-xl font-bold hidden lg:inline text-slate-800 dark:text-white">Aplikasi Cuaca Riau </span>
     </div>
     <nav className="flex flex-col gap-4 w-full flex-1">
       {menuItems.map((item) => (
         <NavLink
           key={item.name}
           to={item.path}
           className={({ isActive }) =>
             `flex items-center gap-4 p-3 rounded-lg transition-colors text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-800 dark:hover:text-white ${
               isActive
                 ? 'bg-blue-500 text-white shadow-lg'
                 : ''
             }`
           }
         >
           <span className="text-2xl">{item.icon}</span>
           <span className="font-semibold hidden lg:inline">{item.name}</span>
         </NavLink>
       ))}
       {userRole === 'admin' && (
         <NavLink
           to="/admin"
           className={({ isActive }) => `flex items-center gap-4 p-3 rounded-lg transition-colors mt-4 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-800 dark:hover:text-white ${ isActive ? 'bg-green-500 text-white' : '' }`}
         >
           <BsShieldLock className="text-2xl" />
           <span className="font-semibold hidden lg:inline">Admin Panel</span>
         </NavLink>
       )}
     </nav>
     <div className="p-2 w-full">
       <button
         onClick={handleRoleChange}
         className="w-full text-center p-3 rounded-lg bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors text-slate-600 dark:text-slate-300"
       >
         <p className="text-sm font-bold capitalize">{userRole}</p>
         <p className="text-xs text-slate-500 dark:text-slate-400">Ketuk untuk beralih</p>
       </button>
     </div>
   </div>
 );
};

export default Sidebar;