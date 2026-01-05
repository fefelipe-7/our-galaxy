import React, { useState } from 'react';
import { Plus, Heart } from 'lucide-react';

const ABSENCES = [
  { id: 1, text: "Hoje senti falta do seu café da manhã.", date: "10:30", type: 'thought' },
  { id: 2, text: "Pensei em te ligar quando vi aquele filme.", date: "Ontem", type: 'miss' },
];

const Absences: React.FC = () => {
  const [newAbsence, setNewAbsence] = useState('');

  return (
    <div className="min-h-screen px-4 sm:px-6 pt-10 sm:pt-12">
      <h1 className="text-2xl sm:text-3xl font-serif text-cozy-deep font-bold mb-1 sm:mb-2">Faltas</h1>
      <p className="text-cozy-sageDark text-xs sm:text-sm mb-6 sm:mb-10">Pequenos registros de ausência.</p>

      <div className="mb-6 sm:mb-10 relative">
        <div className="bg-white rounded-2xl sm:rounded-[1.5rem] p-2 pl-4 sm:pl-6 shadow-soft flex items-center gap-3 sm:gap-4 focus-within:ring-2 ring-cozy-sage/20 transition-all">
            <Heart size={18} className="text-cozy-clay flex-shrink-0 sm:w-5 sm:h-5" />
            <input 
                type="text" 
                placeholder="Hoje senti falta de..." 
                className="flex-1 bg-transparent text-cozy-deep outline-none placeholder-cozy-sageLight font-serif h-10 sm:h-12 text-sm sm:text-base"
                value={newAbsence}
                onChange={(e) => setNewAbsence(e.target.value)}
            />
            <button className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center transition-all flex-shrink-0 ${newAbsence ? 'bg-cozy-sage text-white' : 'bg-transparent text-transparent'}`}>
                <Plus size={18} className="sm:w-5 sm:h-5" />
            </button>
        </div>
      </div>

      <div className="space-y-3 sm:space-y-4">
        {ABSENCES.map((item) => (
            <div key={item.id} className="bg-white/60 p-4 sm:p-5 rounded-2xl sm:rounded-3xl border border-white hover:bg-white transition-colors cursor-default animate-slide-up">
                <p className="text-base sm:text-lg text-cozy-deep font-serif leading-relaxed italic">"{item.text}"</p>
                <div className="mt-2 sm:mt-3 flex justify-end">
                    <span className="text-xs font-bold text-cozy-sageDark bg-cozy-sand/30 px-3 py-1 rounded-full">{item.date}</span>
                </div>
            </div>
        ))}
      </div>
    </div>
  );
};

export default Absences;