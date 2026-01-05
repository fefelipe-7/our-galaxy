import { useState, useEffect } from 'react';
import { absenceService, Absence } from '../services/absenceService';

export const useAbsences = (userId: string | null) => {
  const [absences, setAbsences] = useState<Absence[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const fetchAbsences = async () => {
      try {
        setLoading(true);
        const data = await absenceService.getAbsences(userId);
        setAbsences(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao carregar faltas');
      } finally {
        setLoading(false);
      }
    };

    fetchAbsences();
  }, [userId]);

  const createAbsence = async (text: string) => {
    if (!userId) throw new Error('Usuário não autenticado');
    try {
      const newAbsence = await absenceService.createAbsence(text, userId);
      setAbsences([newAbsence, ...absences]);
      return newAbsence;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao criar falta');
      throw err;
    }
  };

  const deleteAbsence = async (id: string) => {
    try {
      await absenceService.deleteAbsence(id);
      setAbsences(absences.filter(a => a.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao deletar falta');
      throw err;
    }
  };

  return {
    absences,
    loading,
    error,
    createAbsence,
    deleteAbsence,
  };
};
