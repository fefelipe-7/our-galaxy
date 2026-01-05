import { supabase } from '../lib/supabase';

export interface Letter {
  id: string;
  content: string;
  author_name: string;
  recipient_name: string;
  likes_count: number;
  is_eternized: boolean;
  created_at: string;
  updated_at: string;
}

export interface LetterLike {
  id: string;
  letter_id: string;
  liker_name: string;
  created_at: string;
}

export const letterService = {
  async getLetters() {
    const { data, error } = await supabase
      .from('letters')
      .select('*')
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

  async createLetter(content: string, authorName: string, recipientName: string) {
    const { data, error } = await supabase
      .from('letters')
      .insert([
        {
          content,
          author_name: authorName,
          recipient_name: recipientName,
          likes_count: 1,
          is_eternized: false,
        },
      ])
      .select()
      .single();

    if (error) throw error;

    // Adicionar like automático do autor
    await supabase
      .from('letter_likes')
      .insert([
        {
          letter_id: data.id,
          liker_name: authorName,
        },
      ]);

    return data as Letter;
  },

  async addLike(letterId: string, likerName: string) {
    // Verificar se já deu like
    const { data: existingLike } = await supabase
      .from('letter_likes')
      .select('*')
      .eq('letter_id', letterId)
      .eq('liker_name', likerName)
      .single();

    if (existingLike) {
      throw new Error('Você já curtiu esta carta');
    }

    // Adicionar like
    const { error: likeError } = await supabase
      .from('letter_likes')
      .insert([
        {
          letter_id: letterId,
          liker_name: likerName,
        },
      ]);

    if (likeError) throw likeError;

    // Atualizar contagem de likes
    const { data: likes } = await supabase
      .from('letter_likes')
      .select('*')
      .eq('letter_id', letterId);

    const likesCount = likes?.length || 0;
    const isEternized = likesCount >= 2;

    const { data: updatedLetter, error: updateError } = await supabase
      .from('letters')
      .update({
        likes_count: likesCount,
        is_eternized: isEternized,
        updated_at: new Date().toISOString(),
      })
      .eq('id', letterId)
      .select()
      .single();

    if (updateError) throw updateError;
    return updatedLetter as Letter;
  },

  async getLikes(letterId: string) {
    const { data, error } = await supabase
      .from('letter_likes')
      .select('*')
      .eq('letter_id', letterId);

    if (error) throw error;
    return data as LetterLike[];
  },

  async deleteLetter(id: string) {
    const { error } = await supabase
      .from('letters')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },
};
