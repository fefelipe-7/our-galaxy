import { supabase } from '../lib/supabase';

export interface Letter {
  id: string;
  content: string;
  author_id: string;
  recipient_id: string;
  status: 'enviada' | 'lida';
  created_at: string;
  updated_at: string;
}

export const letterService = {
  async getLetters(userId: string) {
    const { data, error } = await supabase
      .from('letters')
      .select('*')
      .or(`author_id.eq.${userId},recipient_id.eq.${userId}`)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as Letter[];
  },

  async getLetterById(id: string) {
    const { data, error } = await supabase
      .from('letters')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data as Letter;
  },

  async createLetter(content: string, authorId: string, recipientId: string) {
    const { data, error } = await supabase
      .from('letters')
      .insert([
        {
          content,
          author_id: authorId,
          recipient_id: recipientId,
          status: 'enviada',
        },
      ])
      .select()
      .single();

    if (error) throw error;
    return data as Letter;
  },

  async updateLetterStatus(id: string, status: 'enviada' | 'lida') {
    const { data, error } = await supabase
      .from('letters')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as Letter;
  },

  async deleteLetter(id: string) {
    const { error } = await supabase
      .from('letters')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  subscribeToLetters(userId: string, callback: (letters: Letter[]) => void) {
    const subscription = supabase
      .from('letters')
      .on('*', (payload) => {
        if (
          payload.new.author_id === userId ||
          payload.new.recipient_id === userId
        ) {
          callback([payload.new as Letter]);
        }
      })
      .subscribe();

    return subscription;
  },
};
