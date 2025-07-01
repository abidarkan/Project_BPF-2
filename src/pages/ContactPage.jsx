import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext'; // Gunakan AuthContext untuk info user
import { supabase } from '../supabaseClient';
import toast from 'react-hot-toast';

const ContactPage = () => {
  const { currentUser } = useAuth(); // Ambil info pengguna yang sedang login
  const [form, setForm] = useState({
    subject: "Bug",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.message.trim()) {
      toast.error('Pesan tidak boleh kosong.');
      return;
    }

    if (!currentUser) {
      toast.error('Anda harus login untuk mengirim pesan.');
      return;
    }
    
    setLoading(true);

    // Siapkan data untuk dimasukkan ke tabel 'messages'
    const payload = {
      subject: form.subject,
      message: form.message,
      user_email: currentUser.email,
      user_id: currentUser.id,
    };

    // Gunakan .insert() bukan .update()
    const { error } = await supabase.from('messages').insert([payload]);

    if (error) {
      console.error(error);
      toast.error('Gagal mengirim pesan. Silakan coba lagi.');
    } else {
      toast.success('Terima kasih! Pesan Anda telah terkirim.');
      setForm({ subject: "Bug", message: "" }); // Reset form
    }
    setLoading(false);
  };

  return (
    <div className="animate-fade-in-up space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">Laporan Kendala & Masukan</h1>
      </div>
      <div className="bg-slate-100 dark:bg-slate-800 p-6 rounded-2xl shadow-lg w-full max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Hubungi Kami</h2>
        <p className="text-slate-600 dark:text-slate-300 mb-6">
          Punya pertanyaan, masukan, atau ingin bekerja sama? Silakan kirim pesan melalui form di bawah ini.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Subjek
            </label>
            <select
              name="subject"
              value={form.subject}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="Bug">Laporan Bug</option>
              <option value="Data Inaccuracy">Data Tidak Akurat</option>
              <option value="Suggestion">Saran Fitur</option>
              <option value="Account">Masalah Akun</option>
              <option value="Partnership">Kerja Sama</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Pesan
            </label>
            <textarea
              name="message"
              required
              value={form.message}
              onChange={handleChange}
              rows={6}
              className="w-full p-3 rounded-lg border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Jelaskan masukan atau kendala Anda di sini..."
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading || !currentUser}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-slate-500 disabled:cursor-not-allowed"
            >
              {loading ? 'Mengirim...' : 'Kirim Pesan'}
            </button>
            {!currentUser && <p className="text-xs text-red-400 mt-2">Anda harus login untuk mengirim pesan.</p>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;