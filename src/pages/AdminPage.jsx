// src/pages/AdminPage.jsx
import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import toast from 'react-hot-toast';
import { BsPencilFill } from 'react-icons/bs';

const AdminPage = () => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fungsi untuk mengambil semua profil dari database
  const fetchProfiles = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('profiles')
      .select('*');

    if (error) {
      toast.error('Gagal memuat data pengguna.');
      console.error('Error fetching profiles:', error);
    } else {
      setProfiles(data);
    }
    setLoading(false);
  };

  // Ambil data saat halaman pertama kali dimuat
  useEffect(() => {
    fetchProfiles();
  }, []);

  // Fungsi untuk mengubah peran pengguna
  const handleRoleChange = async (userId, newRole) => {
    const { error } = await supabase
      .from('profiles')
      .update({ role: newRole })
      .eq('id', userId);

    if (error) {
      toast.error('Gagal mengubah peran.');
    } else {
      toast.success('Peran pengguna berhasil diubah.');
      fetchProfiles(); // Muat ulang data untuk menampilkan perubahan
    }
  };

  return (
    <div className="animate-fade-in-up">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manajemen Pengguna</h1>
        <p className="text-sm text-slate-400">{profiles.length} pengguna terdaftar</p>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden">
        {loading ? (
          <p className="p-4 text-center">Memuat data...</p>
        ) : (
          <table className="w-full text-left">
            <thead className="bg-slate-100 dark:bg-slate-700/50">
              <tr>
                <th className="p-4 font-bold text-slate-600 dark:text-slate-300">Nama Lengkap</th>
                <th className="p-4 font-bold text-slate-600 dark:text-slate-300">Email</th>
                <th className="p-4 font-bold text-slate-600 dark:text-slate-300">Peran (Role)</th>
              </tr>
            </thead>
            <tbody className="text-slate-700 dark:text-slate-300">
              {profiles.map(profile => (
                <tr key={profile.id} className="border-b border-slate-200 dark:border-slate-700 last:border-b-0">
                  <td className="p-4">{profile.full_name || '-'}</td>
                  <td className="p-4">{profile.email}</td>
                  <td className="p-4">
                    <select 
                      value={profile.role} 
                      onChange={(e) => handleRoleChange(profile.id, e.target.value)}
                      className="bg-slate-200 dark:bg-slate-700 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminPage;