import { supabase } from '../lib/supabase';

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

export const locationService = {
  async getLocations(userId: string) {
    const { data, error } = await supabase
      .from('locations')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as Location[];
  },

  async getLocationById(id: string) {
    const { data, error } = await supabase
      .from('locations')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data as Location;
  },

  async createLocation(
    title: string,
    description: string,
    latitude: number,
    longitude: number,
    distanceKm: number,
    imageUrl: string,
    userId: string
  ) {
    const { data, error } = await supabase
      .from('locations')
      .insert([
        {
          title,
          description,
          latitude,
          longitude,
          distance_km: distanceKm,
          image_url: imageUrl,
          user_id: userId,
        },
      ])
      .select()
      .single();

    if (error) throw error;
    return data as Location;
  },

  async updateLocation(
    id: string,
    title: string,
    description: string,
    latitude: number,
    longitude: number,
    distanceKm: number,
    imageUrl: string
  ) {
    const { data, error } = await supabase
      .from('locations')
      .update({
        title,
        description,
        latitude,
        longitude,
        distance_km: distanceKm,
        image_url: imageUrl,
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as Location;
  },

  async deleteLocation(id: string) {
    const { error } = await supabase
      .from('locations')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  subscribeToLocations(userId: string, callback: (locations: Location[]) => void) {
    const subscription = supabase
      .from('locations')
      .on('*', (payload) => {
        if (payload.new.user_id === userId) {
          callback([payload.new as Location]);
        }
      })
      .subscribe();

    return subscription;
  },
};
