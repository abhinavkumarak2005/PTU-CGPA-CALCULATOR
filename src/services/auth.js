import { supabase, isSupabaseConfigured } from './supabase';

export const auth = {
  async signUp(name, registerNo, college, batch, email, password) {
    if (!isSupabaseConfigured) {
      console.warn('Supabase not configured. Simulating signup.');
      return { data: { user: { email } }, error: null };
    }
    const result = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          register_no: registerNo,
          college,
          batch
        }
      }
    });

    // If email confirmation is OFF, Supabase logs the user in immediately.
    // This means we have a session, so we can securely insert their profile from the frontend!
    if (result.data?.session && !result.error) {
      await supabase.from('profiles').upsert({
        id: result.data.user.id,
        name,
        register_no: registerNo,
        college,
        batch
      });
    }

    return result;
  },

  async verifyOTP(email, token) {
    if (!isSupabaseConfigured) {
      console.warn('Supabase not configured. Simulating OTP verify.');
      return { data: { session: true }, error: null };
    }
    return supabase.auth.verifyOtp({
      email,
      token,
      type: 'email'
    });
  },

  async logIn(identifier, password) {
    if (!isSupabaseConfigured) {
      console.warn('Supabase not configured. Simulating login.');
      return { data: { session: true }, error: null };
    }
    
    // Check if identifier is email or register number. 
    // Supabase auth inherently uses email. If register number is provided, 
    // we would need a custom edge function or query to find the email first,
    // but for now we assume they entered an email if it contains '@'.
    let email = identifier;
    if (!identifier.includes('@')) {
      // In a real app, query `profiles` by register_no to get email,
      // but you can't query profiles easily unauthenticated due to RLS.
      // So users must use email to login for standard Supabase Auth.
      return { data: null, error: new Error("Please log in using your email address.") };
    }

    return supabase.auth.signInWithPassword({
      email,
      password
    });
  },

  async logOut() {
    if (!isSupabaseConfigured) return;
    return supabase.auth.signOut();
  },

  async updateProfile(userId, data) {
    if (!isSupabaseConfigured) {
      console.warn('Supabase not configured. Simulating updateProfile.');
      return { data, error: null };
    }
    return supabase
      .from('profiles')
      .update(data)
      .eq('id', userId)
      .select()
      .single();
  },

  async resetPasswordRequest(email) {
    if (!isSupabaseConfigured) {
      console.warn('Supabase not configured. Simulating reset password request.');
      return { error: null };
    }
    return supabase.auth.resetPasswordForEmail(email);
  },

  async verifyRecoveryOTP(email, token) {
    if (!isSupabaseConfigured) {
      console.warn('Supabase not configured. Simulating verify recovery OTP.');
      return { data: { session: true }, error: null };
    }
    return supabase.auth.verifyOtp({
      email,
      token,
      type: 'recovery'
    });
  },

  async updatePassword(newPassword) {
    if (!isSupabaseConfigured) {
      console.warn('Supabase not configured. Simulating password update.');
      return { error: null };
    }
    return supabase.auth.updateUser({ password: newPassword });
  }
};
