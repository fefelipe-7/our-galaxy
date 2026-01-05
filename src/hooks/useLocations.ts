import { useState, useEffect } from 'react';
import { locationService, Location } from '../services/locationService';

export const useLocations = (userId: string | null) => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const fetchLocations = async () => {
      try {
        setLoading(true);
        const data = await locationService.getLocations(userId);
        setLocations(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao carregar localizações');
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, [userId]);

  const createLocation = async (
    title: string,
    description: string,
    latitude: number,
    longitude: number,
    distanceKm: number,
    imageUrl: string
  ) => {
    if (!userId) throw new Error('Usuário não autenticado');
    try {
      const newLocation = await locationService.createLocation(
        title,
        description,
        latitude,
        longitude,
        distanceKm,
        imageUrl,
        userId
      );
      setLocations([newLocation, ...locations]);
      return newLocation;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao criar localização');
      throw err;
    }
  };

  const updateLocation = async (
    id: string,
    title: string,
    description: string,
    latitude: number,
    longitude: number,
    distanceKm: number,
    imageUrl: string
  ) => {
    try {
      const updated = await locationService.updateLocation(
        id,
        title,
        description,
        latitude,
        longitude,
        distanceKm,
        imageUrl
      );
      setLocations(locations.map(l => l.id === id ? updated : l));
      return updated;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao atualizar localização');
      throw err;
    }
  };

  const deleteLocation = async (id: string) => {
    try {
      await locationService.deleteLocation(id);
      setLocations(locations.filter(l => l.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao deletar localização');
      throw err;
    }
  };

  return {
    locations,
    loading,
    error,
    createLocation,
    updateLocation,
    deleteLocation,
  };
};
