// src/pages/AdminMessagesPage.jsx
import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import toast from 'react-hot-toast';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

const AdminMessagesPage = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast.error('Gagal memuat pesan.');
    } else {
      setMessages(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div className="animate-fade-in-up">
      <h1 className="text-3xl font-bold mb-6">Pesan Masuk</h1>
      <div className="bg-slate-100 dark:bg-slate-800 rounded-2xl shadow-lg">
        {loading ? (
          <p className="p-6 text-center">Memuat pesan...</p>
        ) : (
          <div className="space-y-4 p-6">
            {messages.length > 0 ? messages.map(msg => (
              <div key={msg.id} className="p-4 bg-slate-200 dark:bg-slate-700/50 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <p className="font-bold text-slate-800 dark:text-white">{msg.subject}</p>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    {format(new Date(msg.created_at), "d MMMM yyyy, HH:mm", { locale: id })}
                  </span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300 mb-3 border-t border-slate-300 dark:border-slate-600 pt-2">{msg.message}</p>
                <p className="text-xs font-semibold text-blue-500">Dari: {msg.user_email}</p>
              </div>
            )) : (
              <p className="text-center text-slate-500">Tidak ada pesan masuk.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminMessagesPage;