// src/context/AuthContext.jsx
// Global auth state — wraps the entire app.
// Gracefully handles the pre-Supabase-configuration phase (Phase 0-2)
// by skipping all auth calls when Supabase is not yet set up.

import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../services/supabase';

const AuthContext = createContext(null);

/**
 * Wrap your app with <AuthProvider> in App.jsx.
 * Use useAuth() in any component to access auth state.
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadProfile = async (userId) => {
    if (!isSupabaseConfigured) return;
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      if (!error) setProfile(data);
    } catch {
      setProfile(null);
    }
  };

  useEffect(() => {
    // If Supabase isn't configured yet (Phase 0-2), skip all auth checks
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }

    // Get current session on first mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      const u = session?.user ?? null;
      setUser(u);
      if (u) loadProfile(u.id);
      setLoading(false);
    }).catch(() => {
      setLoading(false);
    });

    // Listen to auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        const u = session?.user ?? null;
        setUser(u);
        if (u) {
          await loadProfile(u.id);
        } else {
          setProfile(null);
        }
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const value = {
    user,
    profile,
    isLoggedIn: !!user,
    loading,
    refreshProfile: () => user && isSupabaseConfigured && loadProfile(user.id),
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Hook to access auth state.
 * Usage: const { user, profile, isLoggedIn, loading } = useAuth();
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth() must be used inside <AuthProvider>');
  }
  return context;
}
