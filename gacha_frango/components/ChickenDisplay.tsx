import React from 'react';
import { ChickenType } from '../types';
import LoadingSpinner from './LoadingSpinner';

interface ChickenDisplayProps {
  chicken: ChickenType | null;
  isLoading: boolean;
}

const ChickenDisplay: React.FC<ChickenDisplayProps> = ({ chicken, isLoading }) => {
  const rarity = chicken?.rarity;
  const rarityColor = chicken?.color ?? 'bg-gray-700';
  const rarityTextColor = chicken?.textColor ?? 'text-gray-200';
  const glowEffect = chicken ? `shadow-lg ${chicken.glowColor}` : '';

  return (
    <div className="w-full max-w-md h-96 bg-black bg-opacity-30 rounded-2xl flex items-center justify-center p-4 border-2 border-purple-500/50 transition-all duration-500 relative overflow-hidden">
      {isLoading ? (
        <LoadingSpinner />
      ) : chicken ? (
        <div className="w-full h-full flex flex-col items-center justify-center animate-fade-in">
          <div className={`absolute top-4 ${rarityColor} px-4 py-1 rounded-full text-sm font-bold ${rarityTextColor} shadow-md`}>
            {rarity}
          </div>
          <div className={`w-72 h-72 rounded-lg overflow-hidden transition-all duration-500 ${glowEffect}`}>
             <img src={chicken.imageUrl} alt={chicken.name} className="w-full h-full object-cover" />
          </div>
          <h3 className="mt-4 text-xl font-bold text-white text-center">
            {chicken.name}
          </h3>
        </div>
      ) : (
        <div className="text-center">
            <p className="text-5xl mb-4">🍗</p>
          <h2 className="text-2xl font-bold text-purple-200">Gacha de Frango</h2>
          <p className="text-purple-300 mt-2">Puxe um frango agora!</p>
        </div>
      )}
    </div>
  );
};

export default ChickenDisplay;