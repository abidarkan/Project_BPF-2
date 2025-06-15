// src/pages/AdminPage.jsx
import React, { useState, useEffect } from 'react';
import initialUsers from '../data/users.json';
import { BsPencilFill, BsTrash, BsPlusLg, BsXCircle, BsExclamationTriangleFill } from 'react-icons/bs';

const ConfirmationModal = ({ onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 animate-fade-in-up">
      <div className="bg-slate-700 dark:bg-slate-800 p-8 rounded-2xl w-full max-w-md border border-slate-600 dark:border-slate-700 shadow-2xl">
        <div className="text-center">
          <BsExclamationTriangleFill className="mx-auto text-5xl text-yellow-400 mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Apakah Anda Yakin?</h2>
          <p className="text-slate-200 dark:text-slate-300">Tindakan ini tidak dapat dibatalkan. Pengguna akan dihapus secara permanen.</p>
          <div className="flex justify-center gap-4 mt-8">
            <button onClick={onCancel} className="px-6 py-2 bg-slate-500 hover:bg-slate-400 text-white font-semibold rounded-lg transition-colors">Batal</button>
            <button onClick={onConfirm} className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-semibold transition-colors">Ya, Hapus</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const UserForm = ({ onClose, onSave, user }) => {
  const [email, setEmail] = useState(user ? user.email : '');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(user ? user.role : 'user');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim() || (!user && !password.trim())) {
        alert('Email dan Password wajib diisi untuk pengguna baru.');
        return;
    }
    const userData = { email, role };
    if (password.trim()) {
      userData.password = password;
    }
    onSave(userData);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50" onClick={onClose}>
      <div className="bg-slate-700 dark:bg-slate-800 p-8 rounded-2xl w-full max-w-md border border-slate-600 dark:border-slate-700 shadow-2xl" onClick={e => e.stopPropagation()}>
        <h2 className="text-2xl font-bold text-white mb-6">{user ? 'Edit Pengguna' : 'Tambah Pengguna Baru'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-bold text-gray-300 dark:text-gray-400 block">Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full p-3 mt-1 bg-slate-600 dark:bg-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="text-sm font-bold text-gray-300 dark:text-gray-400 block">Password</label>
            <input type="password" onChange={e => setPassword(e.target.value)} placeholder={user ? 'Kosongkan jika tidak ingin ganti' : 'Wajib diisi'} required={!user} className="w-full p-3 mt-1 bg-slate-600 dark:bg-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="text-sm font-bold text-gray-300 dark:text-gray-400 block">Peran (Role)</label>
            <select value={role} onChange={e => setRole(e.target.value)} className="w-full p-3 mt-1 bg-slate-600 dark:bg-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="flex justify-end gap-4 pt-4">
            <button type="button" onClick={onClose} className="px-6 py-2 bg-slate-500 rounded-lg hover:bg-slate-400 font-semibold text-white">Batal</button>
            <button type="submit" className="px-6 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 font-semibold text-white">Simpan</button>
          </div>
        </form>
      </div>
    </div>
  );
};


const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [userToAction, setUserToAction] = useState(null);

  useEffect(() => {
    const storedUsers = localStorage.getItem('app_users');
    if (storedUsers && JSON.parse(storedUsers).length > 0) {
      setUsers(JSON.parse(storedUsers));
    } else {
      setUsers(initialUsers);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('app_users', JSON.stringify(users));
  }, [users]);

  const addUser = (newUser) => {
    const userWithId = { ...newUser, id: Date.now() };
    setUsers(currentUsers => [...currentUsers, userWithId]);
  };

  const updateUser = (userId, updatedData) => {
    setUsers(currentUsers => currentUsers.map(user => 
      (user.id === userId ? { ...user, ...updatedData } : user)
    ));
  };

  const deleteUser = (userId) => {
    setUsers(currentUsers => currentUsers.filter(user => user.id !== userId));
  };

  const handleSaveUser = (userData) => {
    if (userToAction && userToAction.id) {
      updateUser(userToAction.id, userData);
    } else {
      addUser(userData);
    }
    closeFormModal();
  };
  
  const handleDeleteRequest = (user) => {
    setUserToAction(user);
    setIsConfirmModalOpen(true);
  };
  
  const confirmDelete = () => {
    if (userToAction) {
      deleteUser(userToAction.id);
      setIsConfirmModalOpen(false);
      setUserToAction(null);
    }
  };

  const openAddModal = () => {
    setUserToAction({});
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
    <div className="animate-fade-in-up">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manajemen Pengguna</h1>
        <button onClick={openAddModal} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg">
          <BsPlusLg />
          <span>Tambah Pengguna</span>
        </button>
      </div>

      {/* --- PERUBAHAN DI SINI --- */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-100 dark:bg-slate-700/50">
            <tr>
              <th className="p-4 font-bold text-slate-600 dark:text-slate-300">Email</th>
              <th className="p-4 font-bold text-slate-600 dark:text-slate-300">Peran (Role)</th>
              <th className="p-4 font-bold text-slate-600 dark:text-slate-300 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="text-slate-700 dark:text-slate-300">
            {users.map(user => (
              <tr key={user.id} className="border-b border-slate-200 dark:border-slate-700 last:border-b-0 hover:bg-slate-50 dark:hover:bg-slate-700/30">
                <td className="p-4">{user.email}</td>
                <td className="p-4 capitalize">{user.role}</td>
                <td className="p-4 flex justify-end gap-4">
                  <button onClick={() => openEditModal(user)} className="text-yellow-500 hover:text-yellow-600 dark:text-yellow-400 dark:hover:text-yellow-300 transition-colors" title="Edit"><BsPencilFill /></button>
                  <button onClick={() => handleDeleteRequest(user)} className="text-red-500 hover:text-red-600 dark:text-red-500 dark:hover:text-red-400 transition-colors" title="Hapus"><BsTrash /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isFormModalOpen && (
        <UserForm 
          onClose={closeFormModal} 
          onSave={handleSaveUser}
          user={userToAction && userToAction.id ? userToAction : null} 
        />
      )}

      {isConfirmModalOpen && (
        <ConfirmationModal
          onConfirm={confirmDelete}
          onCancel={() => setIsConfirmModalOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminPage;