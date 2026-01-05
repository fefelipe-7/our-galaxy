import React from 'react';
import { Camera } from 'lucide-react';

const MOMENTS = [
  { id: 1, date: '15 out 2023', text: 'o dia da chuva.', image: 'https://picsum.photos/seed/rain/400/250' },
  { id: 2, date: '02 fev 2023', text: 'a primeira casa.', image: 'https://picsum.photos/seed/house/400/250' },
];

const Moments: React.FC = () => {
  return (
    <div className="min-h-screen px-4 sm:px-6 pt-10 sm:pt-12">
      <div className="flex justify-between items-end mb-6 sm:mb-10">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif text-cozy-deep font-bold">momentos</h1>
          <p className="text-cozy-sageDark text-xs sm:text-sm mt-1">memórias conscientes.</p>
        </div>
        <button className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-xl sm:rounded-2xl shadow-soft text-cozy-deep flex items-center justify-center hover:bg-cozy-sand transition-colors flex-shrink-0">
          <Camera size={18} className="sm:w-5 sm:h-5" />
        </button>
      </div>

      <div className="grid gap-6 sm:gap-8">
        {MOMENTS.map((moment) => (
          <div key={moment.id} className="group bg-white p-3 sm:p-3 pb-4 sm:pb-6 rounded-2xl sm:rounded-[2.5rem] shadow-soft hover:shadow-lg transition-all duration-500">
            <div className="overflow-hidden rounded-xl sm:rounded-[2rem] h-40 sm:h-56 mb-3 sm:mb-5 relative">
              <div className="absolute inset-0 bg-cozy-deep/10 group-hover:bg-transparent transition-colors z-10"></div>
              <img src={moment.image} alt="Moment" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
            </div>
            <div className="px-3 sm:px-4 text-center">
              <p className="text-cozy-deep font-serif text-lg sm:text-xl font-medium">{moment.text}</p>
              <div className="w-6 h-1 bg-cozy-sage/30 mx-auto my-2 sm:my-3 rounded-full"></div>
              <p className="text-xs font-bold text-cozy-sageDark tracking-wider">{moment.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Moments;