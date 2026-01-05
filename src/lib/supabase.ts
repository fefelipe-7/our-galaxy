import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          name: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          created_at?: string;
        };
        Update: {
          name?: string;
        };
      };
      letters: {
        Row: {
          id: string;
          content: string;
          author_name: string;
          recipient_name: string;
          likes_count: number;
          is_eternized: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          content: string;
          author_name: string;
          recipient_name: string;
          likes_count?: number;
          is_eternized?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          content?: string;
          likes_count?: number;
          is_eternized?: boolean;
          updated_at?: string;
        };
      };
      letter_likes: {
        Row: {
          id: string;
          letter_id: string;
          liker_name: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          letter_id: string;
          liker_name: string;
          created_at?: string;
        };
      };
      absences: {
        Row: {
          id: string;
          text: string;
          user_name: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          text: string;
          user_name: string;
          created_at?: string;
        };
        Update: {
          text?: string;
        };
      };
      moments: {
        Row: {
          id: string;
          text: string;
          image_url: string;
          date: string;
          user_name: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          text: string;
          image_url: string;
          date: string;
          user_name: string;
          created_at?: string;
        };
        Update: {
          text?: string;
          image_url?: string;
          date?: string;
        };
      };
    };
  };
};
