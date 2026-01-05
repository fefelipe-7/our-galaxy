import { supabase } from '../lib/supabase';

export interface Moment {
  id: string;
  text: string;
  image_url: string;
  date: string;
  user_id: string;
  created_at: string;
}

export const momentService = {
  async getMoments(userId: string) {
    const { data, error } = await supabase
      .from('moments')
      .select('*')
      .eq('user_id', userId)
      .order('date', { ascending: false });

    if (error) throw error;
    return data as Moment[];
  },

  async createMoment(text: string, imageUrl: string, date: string, userId: string) {
    const { data, error } = await supabase
      .from('moments')
      .insert([
        {
          text,
          image_url: imageUrl,
          date,
          user_id: userId,
        },
      ])
      .select()
      .single();

    if (error) throw error;
    return data as Moment;
  },

  async updateMoment(id: string, text: string, imageUrl: string, date: string) {
    const { data, error } = await supabase
      .from('moments')
      .update({
        text,
        image_url: imageUrl,
        date,
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as Moment;
  },

  async deleteMoment(id: string) {
    const { error } = await supabase
      .from('moments')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  subscribeToMoments(userId: string, callback: (moments: Moment[]) => void) {
    const subscription = supabase
      .from('moments')
      .on('*', (payload) => {
        if (payload.new.user_id === userId) {
          callback([payload.new as Moment]);
        }
      })
      .subscribe();

    return subscription;
  },
};
