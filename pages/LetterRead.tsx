import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { X, Heart } from 'lucide-react';
import { useLetters } from '../src/hooks/useLetters';
import { Letter } from '../src/services/letterService';

const LetterRead: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { letters, addLike, loading } = useLetters();
  const [isVisible, setIsVisible] = useState(false);
  const [letter, setLetter] = useState<Letter | null>(null);
  const [hasLiked, setHasLiked] = useState(false);
  const [readerName, setReaderName] = useState('');
  const [showNameInput, setShowNameInput] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id && letters.length > 0) {
      const found = letters.find(l => l.id === id);
      setLetter(found || null);
    }
  }, [id, letters]);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const getTransitionClass = (delay: string) => 
    `transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${delay}`;

  const handleLike = async () => {
    if (!readerName.trim()) {
      setError('Digite seu nome para curtir');
      return;
    }

    if (!letter) return;

    try {
      setError(null);
      await addLike(letter.id, readerName);
      setHasLiked(true);
      setShowNameInput(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao curtir');
    }
  };

  if (!letter) {
    return (
      <div className="min-h-screen bg-cozy-cream flex flex-col px-6 pt-10 pb-12 items-center justify-center">
        <p className="text-cozy-sageDark">Carregando carta...</p>
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex flex-col px-6 pt-10 pb-12 relative ${letter.is_eternized ? 'bg-gradient-to-br from-cozy-cream via-cozy-sageLight/20 to-cozy-sand/10' : 'bg-cozy-cream'}`}>
      <div className="flex justify-between items-center mb-8">
        <span className="text-xs font-bold text-cozy-sageDark bg-cozy-sageLight/30 px-3 py-1 rounded-full tracking-wider">
          {new Date(letter.created_at).toLocaleDateString('pt-BR')}
        </span>
        <button 
          onClick={() => navigate('/home')}
          className="w-10 h-10 rounded-full bg-white shadow-soft flex items-center justify-center text-cozy-deep hover:bg-cozy-sand transition-colors active:scale-90"
        >
          <X size={20} />
        </button>
      </div>

      <div className={`flex-1 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <div className={`rounded-[2.5rem] p-8 shadow-soft border min-h-[60vh] relative overflow-hidden ${letter.is_eternized ? 'bg-white/95 border-cozy-sage/30' : 'bg-white border-cozy-sageLight/10'}`}>
          {letter.is_eternized && (
            <div className="absolute top-0 right-0 w-40 h-40 bg-cozy-sage/10 rounded-full blur-3xl -mr-20 -mt-20 animate-pulse-slow"></div>
          )}
          
          <h2 className={`text-3xl font-serif text-cozy-deep font-bold mb-2 relative z-10 ${getTransitionClass('delay-300')}`}>
            {letter.author_name} escreveu:
          </h2>
          
          <p className={`text-sm text-cozy-sageDark mb-8 relative z-10 ${getTransitionClass('delay-400')}`}>
            para {letter.recipient_name}
          </p>

          <div className="space-y-6 font-serif text-lg leading-loose text-cozy-deep/90 relative z-10">
            <p className={getTransitionClass('delay-500')}>
              {letter.content}
            </p>
          </div>
          
          <div className={`mt-12 flex flex-col items-center gap-4 transition-all duration-1000 delay-[1800ms] ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
            {letter.is_eternized && (
              <div className="text-center mb-4">
                <p className="text-xs font-bold text-cozy-sage tracking-wider mb-2">✨ ETERNIZADA ✨</p>
                <p className="text-xs text-cozy-sageDark">esta carta recebeu dois corações</p>
              </div>
            )}

            {showNameInput && !hasLiked ? (
              <div className="w-full max-w-xs">
                <input
                  type="text"
                  value={readerName}
                  onChange={(e) => setReaderName(e.target.value)}
                  placeholder="seu nome..."
                  className="w-full bg-cozy-cream rounded-2xl px-4 py-3 text-cozy-deep outline-none focus:ring-2 ring-cozy-sage/20 transition-all border border-cozy-sageLight/20 font-serif text-sm text-center mb-3"
                  onKeyPress={(e) => e.key === 'Enter' && handleLike()}
                />
                {error && (
                  <p className="text-xs text-cozy-clay text-center mb-3">{error}</p>
                )}
                <button
                  onClick={handleLike}
                  disabled={!readerName.trim() || loading}
                  className="w-full bg-cozy-deep text-white rounded-2xl px-4 py-3 font-bold text-sm hover:bg-cozy-charcoal active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <Heart size={16} /> curtir
                </button>
              </div>
            ) : hasLiked ? (
              <div className="text-center">
                <div className="animate-pulse-slow mb-2">
                  <Heart size={28} className="text-cozy-clay fill-current mx-auto" />
                </div>
                <p className="text-sm text-cozy-sageDark font-serif">você curtiu esta carta</p>
                <p className="text-xs text-cozy-sage mt-2">{letter.likes_count} {letter.likes_count === 1 ? 'coração' : 'corações'}</p>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LetterRead;