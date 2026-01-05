import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const WelcomeNew: React.FC = () => {
  const navigate = useNavigate();
  const [showText1, setShowText1] = useState(false);
  const [showText2, setShowText2] = useState(false);
  const [showText3, setShowText3] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setShowText1(true), 800);
    const t2 = setTimeout(() => setShowText2(true), 2200);
    const t3 = setTimeout(() => setShowText3(true), 3600);
    const t4 = setTimeout(() => setShowImage(true), 4800);
    const t5 = setTimeout(() => setShowButton(true), 6000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, []);

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-between relative bg-cozy-cream overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-cozy-sage/15 rounded-full blur-3xl -mr-48 -mt-48 animate-pulse-slow"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-cozy-clay/15 rounded-full blur-3xl -ml-40 -mb-40"></div>

      {/* Content container */}
      <div className="flex-1 flex flex-col items-center justify-center w-full px-6 z-10">
        {/* Text sequence */}
        <div className="text-center space-y-8">
          {showText1 && (
            <h1 className="text-4xl font-serif font-bold text-cozy-deep animate-fade-in">
              Lento.
            </h1>
          )}
          
          {showText2 && (
            <h1 className="text-4xl font-serif font-bold text-cozy-deep animate-fade-in">
              Assíncrono.
            </h1>
          )}
          
          {showText3 && (
            <h1 className="text-4xl font-serif font-bold text-cozy-deep animate-fade-in">
              Escolhido.
            </h1>
          )}
        </div>

        {/* Image */}
        {showImage && (
          <div className="mt-16 animate-fade-in">
            <div className="relative w-56 h-56">
              <div className="absolute inset-0 bg-cozy-sand/20 rounded-full blur-2xl animate-pulse"></div>
              <img
                src="https://picsum.photos/seed/calm/400/400"
                alt="Welcome"
                className="relative w-full h-full rounded-full object-cover shadow-soft border-4 border-white"
              />
            </div>
          </div>
        )}
      </div>

      {/* Button at bottom */}
      {showButton && (
        <div className="w-full px-6 pb-8 animate-fade-in">
          <button
            onClick={() => navigate('/home')}
            className="w-full bg-cozy-deep text-white font-bold py-5 px-8 rounded-[2rem] shadow-float hover:bg-cozy-charcoal active:scale-95 transition-all duration-300 flex items-center justify-between group"
          >
            <span className="text-lg">Entrar no silêncio</span>
            <div className="bg-white/10 p-2 rounded-full group-hover:translate-x-1 transition-transform">
              <ArrowRight size={20} className="text-cozy-cream" />
            </div>
          </button>
        </div>
      )}
    </div>
  );
};

export default WelcomeNew;
