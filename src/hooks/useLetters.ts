import { useState, useEffect } from 'react';
import { letterService, Letter } from '../services/letterService';

export const useLetters = () => {
  const [letters, setLetters] = useState<Letter[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLetters = async () => {
      try {
        setLoading(true);
        const data = await letterService.getLetters();
        setLetters(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao carregar cartas');
      } finally {
        setLoading(false);
      }
    };

    fetchLetters();
  }, []);

  const createLetter = async (content: string, authorName: string, recipientName: string) => {
    try {
      const newLetter = await letterService.createLetter(content, authorName, recipientName);
      setLetters([newLetter, ...letters]);
      return newLetter;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao criar carta');
      throw err;
    }
  };

  const addLike = async (letterId: string, likerName: string) => {
    try {
      const updated = await letterService.addLike(letterId, likerName);
      setLetters(letters.map(l => l.id === letterId ? updated : l));
      return updated;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao curtir carta');
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
    addLike,
    deleteLetter,
  };
};
