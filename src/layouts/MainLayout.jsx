// src/layouts/MainLayout.jsx
import React, { useState, useContext } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { SettingsContext } from '../context/SettingsContext';

const MainLayout = () => {
 const [userRole, setUserRole] = useState('guest');
 const { theme } = useContext(SettingsContext);

 return (
   <div className={theme}>
     <div className="flex min-h-screen bg-white dark:bg-slate-900 text-slate-800 dark:text-white">
       <Sidebar userRole={userRole} setUserRole={setUserRole} />
       <main className="flex-1 p-6 lg:p-10">
         <Outlet />
       </main>
     </div>
   </div>
 );
};

export default MainLayout;