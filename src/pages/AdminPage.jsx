// src/pages/AdminPage.jsx
import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import toast from 'react-hot-toast';
import { BsPencilFill, BsTrash, BsExclamationTriangleFill } from 'react-icons/bs';

const ConfirmationModal = ({ onConfirm, onCancel, loading }) => {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 animate-fade-in-up">
      <div className="bg-slate-800 p-8 rounded-2xl w-full max-w-md border border-slate-700 shadow-2xl">
        <div className="text-center">
          <BsExclamationTriangleFill className="mx-auto text-5xl text-yellow-400 mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Apakah Anda Yakin?</h2>
          <p className="text-slate-300">Pengguna akan dihapus secara permanen dari sistem otentikasi.</p>
          <div className="flex justify-center gap-4 mt-8">
            <button onClick={onCancel} disabled={loading} className="px-6 py-2 bg-slate-600 rounded-lg hover:bg-slate-500 font-semibold transition-colors disabled:opacity-50">Batal</button>
            <button onClick={onConfirm} disabled={loading} className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-semibold transition-colors disabled:opacity-50">
              {loading ? 'Menghapus...' : 'Ya, Hapus'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const AdminPage = () => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [userToAction, setUserToAction] = useState(null);

  const fetchProfiles = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast.error('Gagal memuat data pengguna.');
    } else {
      setProfiles(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  const handleRoleChange = async (userId, newRole) => {
    const { error } = await supabase
      .from('profiles')
      .update({ role: newRole })
      .eq('id', userId);

    if (error) {
      toast.error('Gagal mengubah peran.');
    } else {
      toast.success('Peran pengguna berhasil diubah.');
      setProfiles(prev => prev.map(p => (p.id === userId ? { ...p, role: newRole } : p)));
    }
  };

  const handleDeleteRequest = (user) => {
    setUserToAction(user);
    setIsConfirmModalOpen(true);
  };

  const confirmDelete = async () => {
    if (userToAction) {
      setDeleteLoading(true);
      try {
        const { error } = await supabase.functions.invoke('delete-user', {
          body: { targetUserId: userToAction.id },
        });

        if (error) throw error;

        setProfiles(prev => prev.filter(p => p.id !== userToAction.id));
        toast.success('Pengguna berhasil dihapus.');
      } catch (error) {
        toast.error(`Gagal menghapus pengguna: ${error.message}`);
      } finally {
        setIsConfirmModalOpen(false);
        setUserToAction(null);
        setDeleteLoading(false);
      }
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
          <p className="p-6 text-center text-slate-500">Memuat data pengguna...</p>
        ) : (
          <table className="w-full text-left">
            <thead className="bg-slate-100 dark:bg-slate-700/50">
              <tr>
                <th className="p-4 font-bold text-slate-600 dark:text-slate-300">Nama Lengkap</th>
                <th className="p-4 font-bold text-slate-600 dark:text-slate-300">Email</th>
                <th className="p-4 font-bold text-slate-600 dark:text-slate-300">Peran</th>
                <th className="p-4 font-bold text-slate-600 dark:text-slate-300 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-slate-700 dark:text-slate-300">
              {profiles.map(profile => (
                <tr key={profile.id} className="border-b border-slate-200 dark:border-slate-700 last:border-b-0">
                  <td className="p-4">{profile.full_name || '(Belum diisi)'}</td>
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
                  <td className="p-4 text-right">
                    {/* --- PERUBAHAN DI SINI --- */}
                    <button
                      onClick={() => handleDeleteRequest(profile)}
                      className="text-red-500 hover:text-red-400 transition-colors"
                      title="Hapus Pengguna"
                    >
                      <BsTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {isConfirmModalOpen && (
        <ConfirmationModal
          onConfirm={confirmDelete}
          onCancel={() => setIsConfirmModalOpen(false)}
          loading={deleteLoading}
        />
      )}
    </div>
  );
};

export default AdminPage;