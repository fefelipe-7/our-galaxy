import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, X } from 'lucide-react';

const LetterWrite: React.FC = () => {
  const navigate = useNavigate();
  const [text, setText] = useState('');

  return (
    <div className="min-h-screen bg-cozy-cream flex flex-col px-6 pt-10 pb-8">
      <div className="flex justify-between items-center mb-6">
         <button 
            onClick={() => navigate('/home')}
            className="text-sm font-bold text-cozy-sageDark hover:text-cozy-deep flex items-center gap-1 transition-colors"
        >
            <X size={18} /> cancelar
        </button>
      </div>

      <div className="flex-1 bg-white rounded-[2.5rem] shadow-soft p-8 relative flex flex-col border border-cozy-sageLight/20">
        <label className="text-xs font-bold tracking-wider text-cozy-sage mb-6 block text-center">
            escreva só quando souber o que quer dizer.
        </label>
        
        <textarea
            autoFocus
            className="w-full flex-1 bg-transparent text-cozy-deep font-serif text-lg leading-loose outline-none resize-none placeholder-cozy-sageLight"
            placeholder="comece aqui..."
            value={text}
            onChange={(e) => setText(e.target.value)}
        />

        <div className="mt-6 flex justify-end">
            <button 
                onClick={() => navigate('/home')}
                disabled={text.length < 10}
                className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-lg ${text.length > 10 ? 'bg-cozy-deep text-white hover:scale-105 active:scale-95' : 'bg-cozy-sand text-white cursor-not-allowed opacity-50'}`}
            >
                <Send size={24} className={text.length > 10 ? 'ml-1' : ''} />
            </button>
        </div>
      </div>
    </div>
  );
};

export default LetterWrite;