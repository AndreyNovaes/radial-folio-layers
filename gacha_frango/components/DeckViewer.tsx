import React, { useState } from 'react';
import { ChickenType, Rarity } from '../types';

interface DeckViewerProps {
  isOpen: boolean;
  onClose: () => void;
  playerName: string;
  playerCollection: ChickenType[];
  playerScore: number;
}

const DeckViewer: React.FC<DeckViewerProps> = ({
  isOpen,
  onClose,
  playerName,
  playerCollection,
  playerScore
}) => {
  const [selectedRarity, setSelectedRarity] = useState<Rarity | null>(null);

  if (!isOpen) return null;

  // Contar cartas por raridade
  const countByRarity = (rarity: Rarity) => {
    return playerCollection.filter(c => c.rarity === rarity).length;
  };

  // Filtrar cartas por raridade selecionada
  const filteredCards = selectedRarity
    ? playerCollection.filter(c => c.rarity === selectedRarity)
    : playerCollection;

  // Contar cartas únicas
  const uniqueCards = new Map<string, number>();
  playerCollection.forEach(card => {
    const count = uniqueCards.get(card.name) || 0;
    uniqueCards.set(card.name, count + 1);
  });

  const rarities: Rarity[] = [
    Rarity.COMMON,
    Rarity.UNCOMMON,
    Rarity.RARE,
    Rarity.EPIC,
    Rarity.LEGENDARY,
    Rarity.ULTRA_LEGENDARY,
  ];

  const getRarityColor = (rarity: Rarity): string => {
    const colors: Record<Rarity, string> = {
      [Rarity.COMMON]: 'bg-gray-600 text-white',
      [Rarity.UNCOMMON]: 'bg-blue-600 text-white',
      [Rarity.RARE]: 'bg-purple-600 text-white',
      [Rarity.EPIC]: 'bg-orange-600 text-white',
      [Rarity.LEGENDARY]: 'bg-yellow-600 text-white',
      [Rarity.ULTRA_LEGENDARY]: 'bg-fuchsia-600 text-white',
    };
    return colors[rarity];
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-gray-800 rounded-2xl border-2 border-purple-500 max-w-2xl w-full my-8 shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6 rounded-t-xl flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold text-white">{playerName}</h2>
            <p className="text-purple-200 text-sm mt-1">Pontuação: {playerScore} | Total de cartas: {playerCollection.length}</p>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-purple-200 text-3xl font-bold w-10 h-10 flex items-center justify-center hover:bg-white/20 rounded-lg transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {playerCollection.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-purple-300 text-lg">Este jogador ainda não puxou nenhum frango!</p>
            </div>
          ) : (
            <>
              {/* Filtro por Raridade */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-purple-300 mb-3">Filtrar por Raridade:</h3>
                <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
                  <button
                    onClick={() => setSelectedRarity(null)}
                    className={`px-3 py-2 rounded-lg font-semibold transition-all ${
                      selectedRarity === null
                        ? 'bg-white text-black scale-105'
                        : 'bg-gray-700 text-white hover:bg-gray-600'
                    }`}
                  >
                    Todos ({playerCollection.length})
                  </button>
                  {rarities.map((rarity) => (
                    <button
                      key={rarity}
                      onClick={() => setSelectedRarity(rarity)}
                      className={`px-2 py-2 rounded-lg font-semibold transition-all text-sm ${
                        selectedRarity === rarity
                          ? `${getRarityColor(rarity)} scale-105 ring-2 ring-white`
                          : `${getRarityColor(rarity)} opacity-70 hover:opacity-100`
                      }`}
                    >
                      {rarity} ({countByRarity(rarity)})
                    </button>
                  ))}
                </div>
              </div>

              {/* Estatísticas de Raridade */}
              <div className="mb-6 p-4 bg-gray-900/50 rounded-lg border border-purple-500/30">
                <h3 className="text-lg font-bold text-purple-300 mb-3">Distribuição de Cartas:</h3>
                <div className="space-y-2">
                  {rarities.map((rarity) => {
                    const count = countByRarity(rarity);
                    const percentage = ((count / playerCollection.length) * 100).toFixed(1);
                    return (
                      <div key={rarity} className="flex items-center gap-3">
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getRarityColor(rarity)}`}>
                          {rarity}
                        </span>
                        <div className="flex-1 bg-gray-700 rounded-full h-2 overflow-hidden">
                          <div
                            className="h-full bg-purple-500 transition-all"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <span className="text-white font-bold w-16 text-right">
                          {count} ({percentage}%)
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Cartas */}
              <div>
                <h3 className="text-lg font-bold text-purple-300 mb-3">
                  {selectedRarity ? `Cartas ${selectedRarity}` : 'Todas as Cartas'} ({filteredCards.length})
                </h3>
                <div className="max-h-96 overflow-y-auto space-y-2">
                  {Array.from(uniqueCards.entries()).map(([cardName, count]) => {
                    const card = playerCollection.find(c => c.name === cardName)!;
                    if (selectedRarity && card.rarity !== selectedRarity) return null;

                    return (
                      <div
                        key={cardName}
                        className="flex items-center gap-4 p-3 bg-gray-900/50 rounded-lg border border-purple-500/30 hover:border-purple-500 transition-colors"
                      >
                        <img
                          src={card.imageUrl}
                          alt={cardName}
                          className="w-16 h-16 rounded-lg object-cover border border-purple-500/50"
                        />
                        <div className="flex-1">
                          <p className="font-bold text-white">{cardName}</p>
                          <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${card.color} ${card.textColor}`}>
                            {card.rarity}
                          </span>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-white">{count}</p>
                          <p className="text-xs text-purple-300">cópias</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeckViewer;
