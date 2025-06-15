// src/context/UserContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import initialUsers from '../data/users.json';

// 1. Buat Context
export const UserContext = createContext();

// Hook kustom untuk mempermudah penggunaan context
export const useUsers = () => {
  return useContext(UserContext);
};

// 2. Buat Provider
export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);

  // Efek ini hanya berjalan sekali untuk memuat data awal
  useEffect(() => {
    try {
      const storedUsers = localStorage.getItem('app_users');
      // Hanya muat dari localStorage jika ada isinya (bukan array kosong)
      if (storedUsers && JSON.parse(storedUsers).length > 0) {
        setUsers(JSON.parse(storedUsers));
      } else {
        // Jika tidak, gunakan data dari file JSON awal
        setUsers(initialUsers);
      }
    } catch (error) {
      console.error("Gagal memuat data pengguna:", error);
      setUsers(initialUsers); // Fallback ke data awal jika ada error
    }
  }, []);

  // Efek ini berjalan setiap kali daftar 'users' berubah untuk menyimpannya
  useEffect(() => {
    try {
      localStorage.setItem('app_users', JSON.stringify(users));
    } catch (error) {
      console.error("Gagal menyimpan data pengguna:", error);
    }
  }, [users]);

  // --- Fungsi CRUD ---
  const addUser = (newUser) => {
    const userWithId = { ...newUser, id: Date.now() };
    setUsers(currentUsers => [...currentUsers, userWithId]);
  };

  const updateUser = (userId, updatedData) => {
    setUsers(currentUsers => 
      currentUsers.map(user =>
        user.id === userId ? { ...user, ...updatedData } : user
      )
    );
  };

  const deleteUser = (userId) => {
    setUsers(currentUsers => currentUsers.filter(user => user.id !== userId));
  };

  // Nilai yang akan dibagikan ke seluruh aplikasi
  const value = {
    users,
    addUser,
    updateUser,
    deleteUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};