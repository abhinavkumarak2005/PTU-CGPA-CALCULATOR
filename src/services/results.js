import { supabase, isSupabaseConfigured } from './supabase';

export const resultsApi = {
  async saveResult(userId, payload) {
    if (!isSupabaseConfigured) {
      console.warn('Supabase not configured. Simulating saveResult.');
      // Simulate success
      return { data: { ...payload, id: 'simulated-id' }, error: null };
    }

    // Upsert based on user_id, college, dept, batch, semester
    // We handle the upsert logic here. Supabase 'upsert' works if we have unique constraints.
    // The DB schema has: UNIQUE(user_id, college, dept, batch, semester)
    
    const { data, error } = await supabase
      .from('saved_results')
      .upsert({
        user_id: userId,
        college: payload.college,
        batch: payload.batch,
        regulation: payload.regulation,
        dept: payload.dept,
        entry_type: payload.entryType || 'regular',
        semester: payload.semester,
        sgpa: payload.sgpa,
        grade_data: payload.gradeData,
        calculated_at: new Date().toISOString()
      }, { onConflict: 'user_id, college, dept, batch, semester' })
      .select()
      .single();

    return { data, error };
  },

  async getResults(userId) {
    if (!isSupabaseConfigured) {
      console.warn('Supabase not configured. Simulating getResults.');
      return { data: [], error: null };
    }

    const { data, error } = await supabase
      .from('saved_results')
      .select('*')
      .eq('user_id', userId)
      .order('semester', { ascending: true });

    return { data, error };
  },

  async deleteResult(resultId) {
    if (!isSupabaseConfigured) {
      console.warn('Supabase not configured. Simulating deleteResult.');
      return { data: true, error: null };
    }

    const { data, error } = await supabase
      .from('saved_results')
      .delete()
      .eq('id', resultId);

    return { data, error };
  }
};
