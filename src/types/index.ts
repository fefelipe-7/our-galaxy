export interface Letter {
  id: string;
  content: string;
  author_id: string;
  recipient_id: string;
  status: 'enviada' | 'lida';
  created_at: string;
  updated_at: string;
}

export interface Absence {
  id: string;
  text: string;
  user_id: string;
  created_at: string;
}

export interface Moment {
  id: string;
  text: string;
  image_url: string;
  date: string;
  user_id: string;
  created_at: string;
}

export interface Location {
  id: string;
  title: string;
  description: string;
  latitude: number;
  longitude: number;
  distance_km: number;
  image_url: string;
  user_id: string;
  created_at: string;
}

export interface User {
  id: string;
  email: string;
  created_at: string;
}
