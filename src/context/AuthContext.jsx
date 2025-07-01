import React, { createContext, useState, useEffect, useContext } from 'react';
import { supabase } from '../supabaseClient';

export const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const signup = (email, password, metadata) => {
    return supabase.auth.signUp({ 
      email, 
      password,
      options: { data: metadata }
    });
  };

  const login = (email, password) => {
    return supabase.auth.signInWithPassword({ email, password });
  };

  const logout = () => {
    return supabase.auth.signOut();
  };

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        // Jika pengguna login, ambil profilnya dari database
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
        
        // Gabungkan data otentikasi dengan data profil
        setCurrentUser({ ...session.user, ...profile });
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};