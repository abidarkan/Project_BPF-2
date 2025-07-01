import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import toast from 'react-hot-toast';
import { BsPencilFill, BsTrash, BsPlusLg, BsExclamationTriangleFill, BsEnvelopeFill } from 'react-icons/bs';

// --- Komponen Modal Konfirmasi (Untuk Hapus) ---
const ConfirmationModal = ({ onConfirm, onCancel, loading }) => {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 animate-fade-in-up">
      <div className="bg-slate-700 dark:bg-slate-800 p-8 rounded-2xl w-full max-w-md border border-slate-600 dark:border-slate-700 shadow-2xl">
        <div className="text-center">
          <BsExclamationTriangleFill className="mx-auto text-5xl text-yellow-400 mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Apakah Anda Yakin?</h2>
          <p className="text-slate-200 dark:text-slate-300">Tindakan ini akan menghapus pengguna secara permanen.</p>
          <div className="flex justify-center gap-4 mt-8">
            <button onClick={onCancel} disabled={loading} className="px-6 py-2 bg-slate-500 hover:bg-slate-400 text-white font-semibold rounded-lg transition-colors disabled:opacity-50">Batal</button>
            <button onClick={onConfirm} disabled={loading} className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-semibold transition-colors disabled:opacity-50">
              {loading ? 'Menghapus...' : 'Ya, Hapus'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Komponen Form (Untuk Tambah/Edit) ---
const UserForm = ({ onClose, onSave, user, loading }) => {
  const [email, setEmail] = useState(user ? user.email : '');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(user ? user.role || 'user' : 'user');
  const [fullName, setFullName] = useState(user ? user.full_name || '' : '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || (!user && !password.trim())) {
      toast.error('Semua kolom wajib diisi untuk pengguna baru.');
      return;
    }
    onSave({ id: user?.id, email, password, role, fullName });
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50" onClick={onClose}>
      <div className="bg-slate-700 dark:bg-slate-800 p-8 rounded-2xl w-full max-w-md border border-slate-600 dark:border-slate-700 shadow-2xl" onClick={e => e.stopPropagation()}>
        <h2 className="text-2xl font-bold text-white mb-6">{user ? 'Edit Pengguna' : 'Tambah Pengguna Baru'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-bold text-gray-300 dark:text-gray-400 block">Nama Lengkap</label>
            <input type="text" value={fullName} onChange={e => setFullName(e.target.value)} required className="w-full p-3 mt-1 bg-slate-600 dark:bg-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="text-sm font-bold text-gray-300 dark:text-gray-400 block">Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required disabled={!!user} className="w-full p-3 mt-1 bg-slate-600 dark:bg-slate-700 text-white rounded-lg focus:outline-none disabled:opacity-50" />
          </div>
          <div>
            <label className="text-sm font-bold text-gray-300 dark:text-gray-400 block">Password</label>
            <input type="password" onChange={e => setPassword(e.target.value)} placeholder={user ? 'Kosongkan jika tidak ingin ganti' : 'Wajib diisi'} required={!user} className="w-full p-3 mt-1 bg-slate-600 dark:bg-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="text-sm font-bold text-gray-300 dark:text-gray-400 block">Peran (Role)</label>
            <select value={role} onChange={e => setRole(e.target.value)} className="w-full p-3 mt-1 bg-slate-600 dark:bg-slate-700 text-white rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="flex justify-end gap-4 pt-4">
            <button type="button" onClick={onClose} disabled={loading} className="px-6 py-2 bg-slate-500 rounded-lg hover:bg-slate-400 font-semibold text-white disabled:opacity-50">Batal</button>
            <button type="submit" disabled={loading} className="px-6 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 font-semibold text-white disabled:opacity-50">{loading ? 'Menyimpan...' : 'Simpan'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};


// --- Halaman Admin Utama ---
const AdminPage = () => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [userToAction, setUserToAction] = useState(null);

  const fetchProfiles = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('profiles').select('*').order('created_at', { ascending: false });
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

  const handleSaveUser = async (userData) => {
    setActionLoading(true);
    try {
      if (userToAction && userToAction.id) {
        const { error } = await supabase.functions.invoke('update-user', { body: { ...userData, id: userToAction.id } });
        if (error) throw error;
        toast.success('Pengguna berhasil diperbarui.');
      } else {
        const { error } = await supabase.functions.invoke('create-user', { body: userData });
        if (error) throw error;
        toast.success('Pengguna baru berhasil ditambahkan.');
      }
      await fetchProfiles();
      closeFormModal();
    } catch (error) {
      toast.error(`Gagal menyimpan: ${error.message}`);
    } finally {
      setActionLoading(false);
    }
  };
  
  const handleDeleteRequest = (user) => {
    setUserToAction(user);
    setIsConfirmModalOpen(true);
  };

  const confirmDelete = async () => {
    if (userToAction) {
      setActionLoading(true);
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
        setActionLoading(false);
      }
    }
  };

  const openAddModal = () => {
    setUserToAction(null);
    setIsFormModalOpen(true);
  };
  
  const openEditModal = (user) => {
    setUserToAction(user);
    setIsFormModalOpen(true);
  };
  
  const closeFormModal = () => {
    setIsFormModalOpen(false);
    setUserToAction(null);
  };

  return (
    <div className="animate-fade-in-up space-y-8">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link 
          to="/app/admin/messages" 
          className="bg-slate-100 dark:bg-slate-800 p-6 rounded-2xl flex items-center gap-6 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors shadow-lg"
        >
          <BsEnvelopeFill className="text-4xl text-blue-500" />
          <div>
            <h2 className="text-xl font-bold">Pesan Masuk</h2>
            <p className="text-slate-500 dark:text-slate-400">Lihat pesan dari pengguna.</p>
          </div>
        </Link>
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Manajemen Pengguna</h2>
          <button onClick={openAddModal} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg">
            <BsPlusLg />
            <span>Tambah Pengguna</span>
          </button>
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
                    <td className="p-4 capitalize">
                      {/* --- PERUBAHAN DI SINI --- */}
                      {/* Jika profile.role kosong, tampilkan 'user' */}
                      {profile.role || 'user'}
                    </td>
                    <td className="p-4 flex justify-end gap-4">
                      <button onClick={() => openEditModal(profile)} className="text-yellow-500 hover:text-yellow-600 dark:text-yellow-400 dark:hover:text-yellow-300 transition-colors" title="Edit"><BsPencilFill /></button>
                      <button onClick={() => handleDeleteRequest(profile)} className="text-red-500 hover:text-red-600 dark:text-red-500 dark:hover:text-red-400 transition-colors" title="Hapus"><BsTrash /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {isFormModalOpen && (
        <UserForm
          onClose={closeFormModal}
          onSave={handleSaveUser}
          user={userToAction}
          loading={actionLoading}
        />
      )}
      {isConfirmModalOpen && (
        <ConfirmationModal
          onConfirm={confirmDelete}
          onCancel={() => setIsConfirmModalOpen(false)}
          loading={actionLoading}
        />
      )}
    </div>
  );
};

export default AdminPage;