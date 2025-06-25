// src/pages/ContactPage.jsx
import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

const ContactPage = () => {
  const [form, setForm] = useState({
    subject: "Bug",
    message: "",
  });

  const [user, setUser] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  // Get logged-in user info
  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (user) {
        setUser(user);
      } else if (error) {
        console.error("Auth error:", error.message);
      }
    };

    getUser();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!user) {
      setError("Anda harus login untuk mengirim pesan.");
      return;
    }

    const payload = {
      subject: form.subject,
      message: form.message,
      email: user.email,
      id: user.id, // optional if used to match profile
    };

    const { error: insertError } = await supabase
      .from("profiles")
      .update({
        subject: payload.subject,
        message: payload.message,
      })
      .eq("id", user.id); // match the current user row

    if (insertError) {
      console.error(insertError);
      setError("Gagal mengirim pesan. Silakan coba lagi.");
    } else {
      setSubmitted(true);
      setForm({ subject: "Bug", message: "" });
    }
  };

  return (
    <div className="animate-fade-in-up space-y-8 p-6">
      <div>
        <h1 className="text-4xl font-bold mb-2">Laporan Kendala</h1>
      </div>
      <div className="bg-slate-100 dark:bg-slate-800 p-6 rounded-2xl shadow-lg w-full max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Hubungi Kami</h2>
        <p className="text-slate-600 dark:text-slate-300 mb-4">
          Punya pertanyaan, masukan, atau ingin bekerja sama? Silakan kirim
          pesan melalui form di bawah ini.
        </p>

        {user && (
          <div className="mb-2 text-sm text-slate-500 dark:text-slate-400">
            Mengirim sebagai: <strong>{user.email}</strong>
          </div>
        )}

        {submitted && (
          <div className="mb-4 p-4 bg-green-100 text-green-800 rounded-lg dark:bg-green-800/20 dark:text-green-300">
            Terima kasih! Pesan Anda telah dikirim.
          </div>
        )}

        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-800 rounded-lg dark:bg-red-800/20 dark:text-red-300">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Subjek
            </label>
            <select
              name="subject"
              value={form.subject}
              onChange={handleChange}
              className="w-full mt-1 p-2 rounded-lg border dark:bg-slate-700 dark:text-white"
              required
            >
              <option value="Bug">Bug</option>
              <option value="Data Inaccuracy">Data Inaccuracy</option>
              <option value="Suggestion">Suggestion</option>
              <option value="Account">Account</option>
              <option value="Partnership">Partnership</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Pesan
            </label>
            <textarea
              name="message"
              required
              value={form.message}
              onChange={handleChange}
              rows={5}
              className="w-full mt-1 p-2 rounded-lg border dark:bg-slate-700 dark:text-white"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Kirim Pesan
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
