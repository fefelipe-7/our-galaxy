import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { X, Heart } from 'lucide-react';

const LetterRead: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Pequeno delay para garantir que a renderização inicial ocorra antes da animação
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Utilitário para classes de transição baseadas em estado
  const getTransitionClass = (delay: string) => 
    `transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${delay}`;

  return (
    <div className="min-h-screen bg-cozy-cream flex flex-col px-6 pt-10 pb-12 relative">
      <div className="flex justify-between items-center mb-8">
         <span className="text-xs font-bold text-cozy-sageDark bg-cozy-sageLight/30 px-3 py-1 rounded-full tracking-wider">
            12 de outubro
         </span>
         <button 
            onClick={() => navigate('/home')}
            className="w-10 h-10 rounded-full bg-white shadow-soft flex items-center justify-center text-cozy-deep hover:bg-cozy-sand transition-colors active:scale-90"
         >
            <X size={20} />
         </button>
      </div>

      <div className={`flex-1 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <div className="bg-white rounded-[2.5rem] p-8 shadow-soft border border-cozy-sageLight/10 min-h-[60vh] relative overflow-hidden">
            {/* Decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-cozy-sage/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
            
            <h2 className={`text-3xl font-serif text-cozy-deep font-bold mb-8 relative z-10 ${getTransitionClass('delay-300')}`}>
                ana escreveu:
            </h2>

            <div className="space-y-6 font-serif text-lg leading-loose text-cozy-deep/90 relative z-10">
                <p className={getTransitionClass('delay-500')}>
                    sobre o que conversamos ontem, fiquei pensando muito no silêncio que ficou entre a gente.
                </p>
                <p className={getTransitionClass('delay-[800ms]')}>
                    não acho que precisamos resolver tudo agora. algumas coisas precisam de tempo para assentar, como poeira depois de uma ventania.
                </p>
                <p className={getTransitionClass('delay-[1100ms]')}>
                    só queria dizer que, apesar do silêncio, ainda estou aqui.
                </p>
                <p className={`font-bold text-cozy-sageDark mt-8 ${getTransitionClass('delay-[1400ms]')}`}>
                    com amor.
                </p>
            </div>
            
            <div className={`mt-12 flex justify-center transition-all duration-1000 delay-[1800ms] ${isVisible ? 'opacity-50 scale-100' : 'opacity-0 scale-90'}`}>
                <div className="animate-pulse-slow">
                    <Heart size={24} className="text-cozy-clay fill-current" />
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default LetterRead;