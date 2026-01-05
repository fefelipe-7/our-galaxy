import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PenTool, Mail } from 'lucide-react';

// MOCK DATA
const LETTERS = [
  { id: 1, date: '12 out', author: 'ana', status: 'lida', preview: 'sobre ontem...', color: 'bg-cozy-sageLight' },
  { id: 2, date: '08 out', author: 'você', status: 'enviada', preview: 'talvez eu...', color: 'bg-cozy-sand' },
  { id: 3, date: '01 set', author: 'ana', status: 'lida', preview: 'lembrei da viagem.', color: 'bg-white' },
];

const Letters: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen px-6 pt-12">
      <div className="flex justify-between items-center mb-8">
        <div>
           <p className="text-cozy-sageDark text-sm font-bold tracking-wider mb-1">espaço privado</p>
           <h1 className="text-3xl font-serif text-cozy-deep font-bold">cartas</h1>
        </div>
        <button 
            onClick={() => navigate('/letter/write')}
            className="w-14 h-14 rounded-2xl bg-cozy-deep text-white shadow-float flex items-center justify-center hover:bg-cozy-charcoal active:scale-90 transition-all"
        >
            <PenTool size={22} />
        </button>
      </div>

      <div className="space-y-6">
        {LETTERS.map((letter) => (
          <div 
            key={letter.id} 
            onClick={() => navigate(`/letter/read/${letter.id}`)}
            className="group relative cursor-pointer"
          >
             <div className={`absolute inset-0 ${letter.color} opacity-40 rounded-[2rem] transform translate-y-2 group-hover:translate-y-3 transition-transform`}></div>
             <div className="relative bg-white p-6 rounded-[2rem] shadow-soft border border-cozy-sageLight/20 group-hover:-translate-y-1 transition-transform duration-300">
                <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-2">
                        <div className={`p-2 rounded-full ${letter.status === 'enviada' ? 'bg-cozy-sand' : 'bg-cozy-sage/20'} text-cozy-deep`}>
                            <Mail size={16} />
                        </div>
                        <span className="text-xs font-bold text-cozy-sageDark tracking-wider">{letter.status}</span>
                    </div>
                    <span className="text-sm font-bold text-cozy-sageDark">{letter.date}</span>
                </div>
                
                <h2 className="text-2xl font-serif text-cozy-deep mb-2">
                    {letter.status === 'enviada' ? 'para ' + letter.author : 'de ' + letter.author}
                </h2>
                <p className="text-cozy-sageDark/80 line-clamp-1 font-serif italic">
                    "{letter.preview}"
                </p>
             </div>
          </div>
        ))}

        {LETTERS.length === 0 && (
            <div className="text-center py-20">
                <div className="w-20 h-20 bg-cozy-sand/50 rounded-full mx-auto flex items-center justify-center mb-4 text-cozy-sageDark">
                    <Mail size={32} />
                </div>
                <p className="text-cozy-deep font-serif italic">o silêncio também é uma resposta.</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default Letters;