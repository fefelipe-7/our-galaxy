import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Welcome: React.FC = () => {
  const navigate = useNavigate();
  const [text1, setText1] = useState(false);
  const [text2, setText2] = useState(false);
  const [text3, setText3] = useState(false);
  const [image, setImage] = useState(false);
  const [button, setButton] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setText1(true), 1000);
    const t2 = setTimeout(() => setText2(true), 2500);
    const t3 = setTimeout(() => setText3(true), 4000);
    const t4 = setTimeout(() => setImage(true), 4800);
    const t5 = setTimeout(() => setButton(true), 6000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-between w-full min-h-screen bg-cozy-cream relative overflow-hidden p-6">
      {/* Background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-cozy-sage/15 rounded-full blur-3xl -mr-48 -mt-48 animate-pulse-slow"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-cozy-clay/15 rounded-full blur-3xl -ml-40 -mb-40"></div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center w-full z-10">
        <div className="text-center space-y-8">
          {text1 && (
            <h1 className="text-4xl font-serif font-bold text-cozy-deep opacity-100 animate-fade-in">
              Lento.
            </h1>
          )}
          
          {text2 && (
            <h1 className="text-4xl font-serif font-bold text-cozy-deep opacity-100 animate-fade-in">
              Assíncrono.
            </h1>
          )}
          
          {text3 && (
            <h1 className="text-4xl font-serif font-bold text-cozy-deep opacity-100 animate-fade-in">
              Escolhido.
            </h1>
          )}
        </div>

        {image && (
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

      {button && (
        <div className="w-full animate-fade-in">
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

export default Welcome;