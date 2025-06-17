import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import { BsClouds } from 'react-icons/bs';

const RegisterPage = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.length < 6) {
      toast.error('Password harus memiliki minimal 6 karakter.');
      return;
    }
    try {
      setLoading(true);
      // Kirim nama lengkap sebagai metadata saat mendaftar
      const { error } = await signup(email, password, { fullName: fullName });
      if (error) throw error;

      toast.success('Akun berhasil dibuat! Silakan login.');
      navigate('/login');
    } catch (error) {
      toast.error(error.message || 'Gagal membuat akun.');
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-900">
      <div className="w-full max-w-md p-8 space-y-6 bg-slate-800 rounded-2xl shadow-lg">
        <div className="text-center">
            <BsClouds className="mx-auto text-5xl text-blue-400 mb-4" />
            <h1 className="text-4xl font-bold text-white">Buat Akun Baru</h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-bold text-gray-400 block">Nama Lengkap</label>
            <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} required
              className="w-full p-3 mt-1 text-gray-200 bg-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="text-sm font-bold text-gray-400 block">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
              className="w-full p-3 mt-1 text-gray-200 bg-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="text-sm font-bold text-gray-400 block">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required
              className="w-full p-3 mt-1 text-gray-200 bg-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <p className="text-xs text-slate-400 mt-1">Minimal 6 karakter.</p>
          </div>
          <button disabled={loading} type="submit" className="w-full p-3 font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-blue-800 transition-colors">
            {loading ? 'Mendaftarkan...' : 'Daftar'}
          </button>
        </form>
        <div className="text-center text-gray-400">
          Sudah punya akun? <Link to="/login" className="font-bold text-blue-400 hover:underline">Login di sini</Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;