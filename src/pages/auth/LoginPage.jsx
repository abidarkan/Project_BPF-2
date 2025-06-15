// src/pages/auth/LoginPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import users from '../../data/users.json';
import { BsClouds } from 'react-icons/bs';
import toast from 'react-hot-toast'; // <-- 1. Impor toast

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // Kita tetap gunakan ini untuk pesan di bawah form
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const storedUsers = localStorage.getItem('app_users');
    const users = storedUsers ? JSON.parse(storedUsers) : [];
    const foundUser = users.find(user => user.email === email && user.password === password);

    setTimeout(() => {
      if (foundUser) {
        // --- 2. Ganti alert dengan toast.success ---
        toast.success('Login berhasil!');
        localStorage.setItem('loggedInUser', JSON.stringify(foundUser));
        navigate('/app/weather/Pekanbaru');
      } else {
        
        toast.error('Email atau password salah.');
        setError('Email atau password salah.');
      }
      setLoading(false);
    }, 500);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-cover bg-center" style={{backgroundImage: "url('https://source.unsplash.com/random/1920x1080/?sky,nature')"}}>
       {/* Toaster khusus untuk halaman login jika diperlukan, tapi yang di MainLayout sudah cukup */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
      
      <div className="relative z-10 w-full max-w-md p-8 space-y-6 bg-slate-800/80 rounded-2xl shadow-2xl border border-slate-700 animate-fade-in-up">
        {/* ... sisa JSX form login tetap sama ... */}
        <div className="text-center">
            <BsClouds className="mx-auto text-5xl text-blue-400 mb-4" />
            <h1 className="text-4xl font-bold text-white">Selamat Datang di Weatherly</h1>
            <p className="text-slate-300 mt-2">Silakan login untuk melanjutkan</p>
        </div>

        {error && <div className="p-3 bg-red-500/20 text-red-400 rounded-lg text-center text-sm">{error}</div>}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="Email"
                   className="w-full p-3 text-gray-200 bg-slate-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 border border-transparent focus:border-blue-500"/>
          </div>
          <div>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Password"
                   className="w-full p-3 text-gray-200 bg-slate-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 border border-transparent focus:border-blue-500"/>
          </div>
          <button disabled={loading} type="submit" 
                  className="w-full p-3 font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-blue-800 transition-colors shadow-lg">
            {loading ? 'Loading...' : 'Login'}
          </button>
        </form>
        <div className="text-center text-xs text-gray-400">
          Gunakan user dari Admin Panel atau default: user@example.com
        </div>
      </div>
    </div>
  );
};

export default LoginPage;