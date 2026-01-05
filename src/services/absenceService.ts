import { supabase } from '../lib/supabase';

export interface Absence {
  id: string;
  text: string;
  user_id: string;
  created_at: string;
}

export const absenceService = {
  async getAbsences(userId: string) {
    const { data, error } = await supabase
      .from('absences')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as Absence[];
  },

  async createAbsence(text: string, userId: string) {
    const { data, error } = await supabase
      .from('absences')
      .insert([
        {
          text,
          user_id: userId,
        },
      ])
      .select()
      .single();

    if (error) throw error;
    return data as Absence;
  },

  async deleteAbsence(id: string) {
    const { error } = await supabase
      .from('absences')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  subscribeToAbsences(userId: string, callback: (absences: Absence[]) => void) {
    const subscription = supabase
      .from('absences')
      .on('*', (payload) => {
        if (payload.new.user_id === userId) {
          callback([payload.new as Absence]);
        }
      })
      .subscribe();

    return subscription;
  },
};
