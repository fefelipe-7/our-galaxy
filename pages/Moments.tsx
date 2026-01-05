import React from 'react';
import { Camera } from 'lucide-react';

const MOMENTS = [
  { id: 1, date: '15 out 2023', text: 'o dia da chuva.', image: 'https://picsum.photos/seed/rain/400/250' },
  { id: 2, date: '02 fev 2023', text: 'a primeira casa.', image: 'https://picsum.photos/seed/house/400/250' },
];

const Moments: React.FC = () => {
  return (
    <div className="min-h-screen px-6 pt-12">
       <div className="flex justify-between items-end mb-10">
        <div>
            <h1 className="text-3xl font-serif text-cozy-deep font-bold">momentos</h1>
            <p className="text-cozy-sageDark text-sm mt-1">memórias conscientes.</p>
        </div>
        <button className="w-12 h-12 bg-white rounded-2xl shadow-soft text-cozy-deep flex items-center justify-center hover:bg-cozy-sand transition-colors">
            <Camera size={20} />
        </button>
      </div>

      <div className="grid gap-8">
        {MOMENTS.map((moment) => (
            <div key={moment.id} className="group bg-white p-3 pb-6 rounded-[2.5rem] shadow-soft hover:shadow-lg transition-all duration-500">
                <div className="overflow-hidden rounded-[2rem] h-56 mb-5 relative">
                    <div className="absolute inset-0 bg-cozy-deep/10 group-hover:bg-transparent transition-colors z-10"></div>
                    <img src={moment.image} alt="Moment" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                </div>
                <div className="px-4 text-center">
                    <p className="text-cozy-deep font-serif text-xl font-medium">{moment.text}</p>
                    <div className="w-8 h-1 bg-cozy-sage/30 mx-auto my-3 rounded-full"></div>
                    <p className="text-xs font-bold text-cozy-sageDark tracking-wider">{moment.date}</p>
                </div>
            </div>
        ))}
      </div>
    </div>
  );
};

export default Moments;