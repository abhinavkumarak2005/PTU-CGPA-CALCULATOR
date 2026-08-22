// src/context/AuthContext.jsx
// Global auth state — wraps the entire app.
// Gracefully handles the pre-Supabase-configuration phase (Phase 0-2)
// by skipping all auth calls when Supabase is not yet set up.

import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../services/supabase';
import { AlertTriangle, LogIn } from 'lucide-react';

const AuthContext = createContext(null);

/**
 * Wrap your app with <AuthProvider> in App.jsx.
 * Use useAuth() in any component to access auth state.
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sessionExpired, setSessionExpired] = useState(false);

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
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      const u = session?.user ?? null;
      setUser(u);
      if (u) {
        await loadProfile(u.id);
      }
      setLoading(false);
    }).catch(() => {
      setLoading(false);
    });

    // Listen to auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (_event === 'TOKEN_REFRESH_FAILED' || (_event === 'SIGNED_OUT' && user)) {
          setSessionExpired(true);
        }

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
      
      {/* Session Expired Global Modal */}
      {sessionExpired && (
        <div className="fixed inset-0 bg-brutal-black/90 z-[9999] flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-brutal-white w-full max-w-sm border-4 border-brutal-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-brutal-yellow border-4 border-brutal-black flex items-center justify-center mb-6 shadow-brutal-sm">
              <AlertTriangle size={32} className="text-brutal-red" strokeWidth={3} />
            </div>
            <h2 className="font-display font-black text-2xl uppercase tracking-tighter mb-2 text-brutal-black">Session Expired</h2>
            <p className="font-bold text-sm text-slate-600 mb-8 max-w-[250px]">Your session has expired or is invalid. Please log in again to continue.</p>
            <button 
              onClick={() => {
                setSessionExpired(false);
                window.location.href = '/auth';
              }} 
              className="w-full bg-brutal-blue text-white border-4 border-brutal-black py-4 font-display font-black text-xl uppercase tracking-widest hover:bg-brutal-red hover:translate-x-1 hover:-translate-y-1 hover:shadow-brutal transition-all flex items-center justify-center gap-2"
            >
              <LogIn size={24} strokeWidth={3} /> Log In
            </button>
          </div>
        </div>
      )}
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
