import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PenTool, Mail, Sparkles } from 'lucide-react';
import { useLetters } from '../src/hooks/useLetters';

const Letters: React.FC = () => {
  const navigate = useNavigate();
  const { letters, loading } = useLetters();

  if (loading) {
    return (
      <div className="min-h-screen px-4 sm:px-6 pt-12 flex items-center justify-center">
        <p className="text-cozy-sageDark">Carregando cartas...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 sm:px-6 pt-10 sm:pt-12">
      <div className="flex justify-between items-center mb-6 sm:mb-8">
        <div>
          <p className="text-cozy-sageDark text-xs sm:text-sm font-bold tracking-wider mb-1">espaço privado</p>
          <h1 className="text-2xl sm:text-3xl font-serif text-cozy-deep font-bold">cartas</h1>
        </div>
        <button 
          onClick={() => navigate('/letter/write')}
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-cozy-deep text-white shadow-float flex items-center justify-center hover:bg-cozy-charcoal active:scale-90 transition-all"
        >
          <PenTool size={20} className="sm:w-6 sm:h-6" />
        </button>
      </div>

      <div className="space-y-4 sm:space-y-6">
        {letters.map((letter) => (
          <div 
            key={letter.id} 
            onClick={() => navigate(`/letter/read/${letter.id}`)}
            className="group relative cursor-pointer"
          >
            <div className={`absolute inset-0 ${letter.is_eternized ? 'bg-gradient-to-r from-cozy-sage/30 to-cozy-sand/30' : 'bg-cozy-sageLight/20'} opacity-40 rounded-2xl sm:rounded-[2rem] transform translate-y-2 group-hover:translate-y-3 transition-transform`}></div>
            <div className={`relative p-4 sm:p-6 rounded-2xl sm:rounded-[2rem] shadow-soft border group-hover:-translate-y-1 transition-transform duration-300 ${letter.is_eternized ? 'bg-white/95 border-cozy-sage/30' : 'bg-white border-cozy-sageLight/20'}`}>
              <div className="flex justify-between items-start mb-3 sm:mb-4 gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  {letter.is_eternized ? (
                    <div className="p-2 rounded-full bg-cozy-sage/20 text-cozy-sage animate-pulse-slow flex-shrink-0">
                      <Sparkles size={14} className="sm:w-4 sm:h-4" />
                    </div>
                  ) : (
                    <div className={`p-2 rounded-full flex-shrink-0 ${letter.likes_count > 0 ? 'bg-cozy-clay/20 text-cozy-clay' : 'bg-cozy-sand/20 text-cozy-sand'}`}>
                      <Mail size={14} className="sm:w-4 sm:h-4" />
                    </div>
                  )}
                  <span className="text-xs font-bold text-cozy-sageDark tracking-wider truncate">
                    {letter.is_eternized ? '✨ eternizada' : `${letter.likes_count} ${letter.likes_count === 1 ? 'coração' : 'corações'}`}
                  </span>
                </div>
                <span className="text-xs sm:text-sm font-bold text-cozy-sageDark flex-shrink-0">
                  {new Date(letter.created_at).toLocaleDateString('pt-BR')}
                </span>
              </div>
              
              <h2 className="text-lg sm:text-2xl font-serif text-cozy-deep mb-1 truncate">
                de {letter.author_name}
              </h2>
              <p className="text-xs text-cozy-sageDark mb-2 sm:mb-3 truncate">para {letter.recipient_name}</p>
              <p className="text-cozy-sageDark/80 line-clamp-2 font-serif italic text-sm">
                "{letter.content.substring(0, 80)}{letter.content.length > 80 ? '...' : ''}"
              </p>
            </div>
          </div>
        ))}

        {letters.length === 0 && (
          <div className="text-center py-16 sm:py-20">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-cozy-sand/50 rounded-full mx-auto flex items-center justify-center mb-4 text-cozy-sageDark">
              <Mail size={28} className="sm:w-8 sm:h-8" />
            </div>
            <p className="text-cozy-deep font-serif italic text-sm sm:text-base">o silêncio também é uma resposta.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Letters;