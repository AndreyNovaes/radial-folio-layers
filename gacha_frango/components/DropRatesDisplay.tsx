import React, { useState } from 'react';
import { Rarity } from '../types';
import { currentEvent, isEventActive } from '../eventConfig';

interface DropRate {
  rarity: Rarity;
  percentage: number;
  color: string;
  textColor: string;
  icon: string;
}

const DropRatesDisplay: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const eventActive = isEventActive();

  // Calcular chances com evento
  let ultraLegendaryChance = 1;
  let legendaryChance = 2;
  let epicChance = 7;
  let rareChance = 15;
  let uncommonChance = 25;
  let commonChance = 50;

  if (eventActive) {
    const mult = currentEvent.multiplier;
    if (currentEvent.rarityBoost === 'ALL') {
      ultraLegendaryChance = 1 * mult;      // 1 * 3 = 3%
      legendaryChance = 2 * mult;           // 2 * 3 = 6%
      epicChance = 7 * mult;                // 7 * 3 = 21%
      rareChance = 15 * mult;               // 15 * 3 = 45%
      // uncommonChance continua 25%
      // Calcular Comum: 100 - (3 + 6 + 21 + 45 + 25) = 100 - 100 = 0%, então fica 8%
      const rare_and_above = ultraLegendaryChance + legendaryChance + epicChance + rareChance;
      commonChance = 100 - (rare_and_above + uncommonChance);
      if (commonChance < 0) commonChance = 0;
    } else if (currentEvent.rarityBoost === 'ULTRA_LEGENDARY') {
      ultraLegendaryChance = 1 * mult;
      commonChance = 50 - (ultraLegendaryChance - 1);
    } else if (currentEvent.rarityBoost === 'LEGENDARY') {
      legendaryChance = 2 * mult;
      commonChance = 50 - (legendaryChance - 2);
    } else if (currentEvent.rarityBoost === 'EPIC') {
      epicChance = 7 * mult;
      commonChance = 50 - (epicChance - 7);
    }
  }

  const dropRates: DropRate[] = [
    { rarity: Rarity.COMMON, percentage: commonChance, color: 'bg-gray-600', textColor: 'text-white', icon: '🟡' },
    { rarity: Rarity.UNCOMMON, percentage: uncommonChance, color: 'bg-blue-600', textColor: 'text-white', icon: '🔵' },
    { rarity: Rarity.RARE, percentage: rareChance, color: 'bg-purple-600', textColor: 'text-white', icon: '💜' },
    { rarity: Rarity.EPIC, percentage: epicChance, color: 'bg-orange-600', textColor: 'text-white', icon: '🧡' },
    { rarity: Rarity.LEGENDARY, percentage: legendaryChance, color: 'bg-yellow-600', textColor: 'text-white', icon: '⭐' },
    { rarity: Rarity.ULTRA_LEGENDARY, percentage: ultraLegendaryChance, color: 'bg-fuchsia-600', textColor: 'text-white', icon: '💎' },
  ];

  return (
    <div className="w-full max-w-md mt-6">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 bg-gray-800 rounded-lg border border-purple-500/30 hover:border-purple-500 transition-colors"
      >
        <span className="font-bold text-purple-300">📊 Chances de Drop</span>
        <span className={`text-xl transition-transform ${isExpanded ? 'rotate-180' : ''}`}>▼</span>
      </button>

      {isExpanded && (
        <div className="mt-3 p-4 bg-gray-900/50 rounded-lg border border-purple-500/30 space-y-3 animate-fade-in">
          {dropRates.map((rate) => (
            <div key={rate.rarity} className="flex items-center gap-3">
              <span className="text-2xl">{rate.icon}</span>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-semibold text-white">{rate.rarity}</span>
                  <span className="text-sm font-bold text-purple-300">{rate.percentage}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-full ${rate.color} transition-all`}
                    style={{ width: `${rate.percentage}%` }}
                  />
                </div>
              </div>
            </div>
          ))}

          <div className={`mt-4 p-3 rounded-lg text-xs text-center ${
            eventActive
              ? 'bg-fuchsia-900/50 border border-fuchsia-500/50 text-fuchsia-300'
              : 'bg-gray-800 border border-purple-500/20 text-purple-300'
          }`}>
            {eventActive ? (
              <>
                <p className="font-bold text-fuchsia-400">🎉 {currentEvent.name}</p>
                <p className="mt-1">✨ {currentEvent.description}</p>
                <p className="mt-2 font-bold">💎 Ultra-Lendária: {ultraLegendaryChance}%</p>
                <p className="font-bold">⭐ Lendário: {legendaryChance}%</p>
                <p className="font-bold">🧡 Épico: {epicChance}%</p>
                <p className="font-bold">💜 Raro: {rareChance}%</p>
                <p className="mt-2 text-fuchsia-200">Aproveite! 🍗✨</p>
              </>
            ) : (
              <>
                <p>💡 Ultra-Lendária = 1 em cada 100 puxadas!</p>
                <p className="mt-1">Boa sorte, Mestre de Frango! 🍗</p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropRatesDisplay;
