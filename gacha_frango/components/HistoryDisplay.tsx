import React from 'react';
import { ChickenType } from '../types';

interface HistoryDisplayProps {
  history: ChickenType[];
}

const HistoryDisplay: React.FC<HistoryDisplayProps> = ({ history }) => {
  if (history.length === 0) {
    return null;
  }

  return (
    <div className="w-full max-w-md mt-8 animate-fade-in">
      <h3 className="text-xl font-bold text-purple-300 mb-4 text-center">Últimas Puxadas</h3>
      <div className="space-y-3">
        {history.map((chicken, index) => (
          <div
            key={`${chicken.imageUrl}-${index}`}
            className="flex items-center p-3 rounded-lg bg-gray-800/50 border border-purple-500/30 shadow-md"
          >
            <img src={chicken.imageUrl} alt={chicken.name} className="w-16 h-16 rounded-md object-cover mr-4 flex-shrink-0" />
            <div className="flex-grow min-w-0">
              <p className="font-bold text-white truncate">{chicken.name}</p>
              <span className={`inline-block mt-1 px-2 py-0.5 text-xs font-semibold rounded-full ${chicken.color} ${chicken.textColor}`}>
                {chicken.rarity}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryDisplay;