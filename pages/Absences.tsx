import React, { useState } from 'react';
import { Plus, Heart } from 'lucide-react';

const ABSENCES = [
  { id: 1, text: "Hoje senti falta do seu café da manhã.", date: "10:30", type: 'thought' },
  { id: 2, text: "Pensei em te ligar quando vi aquele filme.", date: "Ontem", type: 'miss' },
];

const Absences: React.FC = () => {
  const [newAbsence, setNewAbsence] = useState('');

  return (
    <div className="min-h-screen px-6 pt-12">
      <h1 className="text-3xl font-serif text-cozy-deep font-bold mb-2">Faltas</h1>
      <p className="text-cozy-sageDark text-sm mb-10">Pequenos registros de ausência.</p>

      <div className="mb-10 relative">
        <div className="bg-white rounded-[1.5rem] p-2 pl-6 shadow-soft flex items-center gap-4 focus-within:ring-2 ring-cozy-sage/20 transition-all">
            <Heart size={20} className="text-cozy-clay" />
            <input 
                type="text" 
                placeholder="Hoje senti falta de..." 
                className="flex-1 bg-transparent text-cozy-deep outline-none placeholder-cozy-sageLight font-serif h-12"
                value={newAbsence}
                onChange={(e) => setNewAbsence(e.target.value)}
            />
            <button className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${newAbsence ? 'bg-cozy-sage text-white' : 'bg-transparent text-transparent'}`}>
                <Plus size={20} />
            </button>
        </div>
      </div>

      <div className="space-y-4">
        {ABSENCES.map((item) => (
            <div key={item.id} className="bg-white/60 p-5 rounded-3xl border border-white hover:bg-white transition-colors cursor-default animate-slide-up">
                <p className="text-lg text-cozy-deep font-serif leading-relaxed italic">"{item.text}"</p>
                <div className="mt-3 flex justify-end">
                    <span className="text-xs font-bold text-cozy-sageDark bg-cozy-sand/30 px-3 py-1 rounded-full">{item.date}</span>
                </div>
            </div>
        ))}
      </div>
    </div>
  );
};

export default Absences;