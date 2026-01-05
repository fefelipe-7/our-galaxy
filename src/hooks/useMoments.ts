import { useState, useEffect } from 'react';
import { momentService, Moment } from '../services/momentService';

export const useMoments = (userId: string | null) => {
  const [moments, setMoments] = useState<Moment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const fetchMoments = async () => {
      try {
        setLoading(true);
        const data = await momentService.getMoments(userId);
        setMoments(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao carregar momentos');
      } finally {
        setLoading(false);
      }
    };

    fetchMoments();
  }, [userId]);

  const createMoment = async (text: string, imageUrl: string, date: string) => {
    if (!userId) throw new Error('Usuário não autenticado');
    try {
      const newMoment = await momentService.createMoment(text, imageUrl, date, userId);
      setMoments([newMoment, ...moments]);
      return newMoment;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao criar momento');
      throw err;
    }
  };

  const updateMoment = async (id: string, text: string, imageUrl: string, date: string) => {
    try {
      const updated = await momentService.updateMoment(id, text, imageUrl, date);
      setMoments(moments.map(m => m.id === id ? updated : m));
      return updated;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao atualizar momento');
      throw err;
    }
  };

  const deleteMoment = async (id: string) => {
    try {
      await momentService.deleteMoment(id);
      setMoments(moments.filter(m => m.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao deletar momento');
      throw err;
    }
  };

  return {
    moments,
    loading,
    error,
    createMoment,
    updateMoment,
    deleteMoment,
  };
};
