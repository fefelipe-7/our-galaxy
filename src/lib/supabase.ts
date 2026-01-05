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
          email: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          created_at?: string;
        };
        Update: {
          email?: string;
        };
      };
      letters: {
        Row: {
          id: string;
          content: string;
          author_id: string;
          recipient_id: string;
          status: 'enviada' | 'lida';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          content: string;
          author_id: string;
          recipient_id: string;
          status?: 'enviada' | 'lida';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          content?: string;
          status?: 'enviada' | 'lida';
          updated_at?: string;
        };
      };
      absences: {
        Row: {
          id: string;
          text: string;
          user_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          text: string;
          user_id: string;
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
          user_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          text: string;
          image_url: string;
          date: string;
          user_id: string;
          created_at?: string;
        };
        Update: {
          text?: string;
          image_url?: string;
          date?: string;
        };
      };
      locations: {
        Row: {
          id: string;
          title: string;
          description: string;
          latitude: number;
          longitude: number;
          distance_km: number;
          image_url: string;
          user_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description: string;
          latitude: number;
          longitude: number;
          distance_km: number;
          image_url: string;
          user_id: string;
          created_at?: string;
        };
        Update: {
          title?: string;
          description?: string;
          latitude?: number;
          longitude?: number;
          distance_km?: number;
          image_url?: string;
        };
      };
    };
  };
};
