import { useState, useEffect } from 'react';
import { letterService, Letter } from '../services/letterService';

export const useLetters = (userId: string | null) => {
  const [letters, setLetters] = useState<Letter[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const fetchLetters = async () => {
      try {
        setLoading(true);
        const data = await letterService.getLetters(userId);
        setLetters(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao carregar cartas');
      } finally {
        setLoading(false);
      }
    };

    fetchLetters();
  }, [userId]);

  const createLetter = async (content: string, recipientId: string) => {
    if (!userId) throw new Error('Usuário não autenticado');
    try {
      const newLetter = await letterService.createLetter(content, userId, recipientId);
      setLetters([newLetter, ...letters]);
      return newLetter;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao criar carta');
      throw err;
    }
  };

  const updateLetterStatus = async (id: string, status: 'enviada' | 'lida') => {
    try {
      const updated = await letterService.updateLetterStatus(id, status);
      setLetters(letters.map(l => l.id === id ? updated : l));
      return updated;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao atualizar carta');
      throw err;
    }
  };

  const deleteLetter = async (id: string) => {
    try {
      await letterService.deleteLetter(id);
      setLetters(letters.filter(l => l.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao deletar carta');
      throw err;
    }
  };

  return {
    letters,
    loading,
    error,
    createLetter,
    updateLetterStatus,
    deleteLetter,
  };
};
