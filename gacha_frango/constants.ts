import { ChickenType, Rarity } from './types';

// Pontuação para cada raridade
export const RARITY_SCORES: Record<Rarity, number> = {
  [Rarity.COMMON]: 1,
  [Rarity.UNCOMMON]: 3,
  [Rarity.RARE]: 10,
  [Rarity.EPIC]: 25,
  [Rarity.LEGENDARY]: 100,
  [Rarity.ULTRA_LEGENDARY]: 500,
};

// Lista de frangos focada apenas nos times do RJ com imagens locais.
export const CHICKEN_TYPES: ChickenType[] = [
  // =================================================================
  // == FLAMENGO ==
  // =================================================================
  { name: 'Frango do Churrasco Rubro-Negro', rarity: Rarity.COMMON, imageUrl: '/assets/comum-flamengo.png', color: 'bg-red-600', textColor: 'text-white', glowColor: 'shadow-red-500' },
  { name: 'Frango da Raça e Paixão', rarity: Rarity.UNCOMMON, imageUrl: '/assets/incomum-flamengo.png', color: 'bg-red-600', textColor: 'text-white', glowColor: 'shadow-red-500' },
  { name: 'Frango do Gol de Título', rarity: Rarity.RARE, imageUrl: '/assets/raro-flamengo.png', color: 'bg-red-600', textColor: 'text-white', glowColor: 'shadow-red-500' },
  { name: 'Frango da Nação Rubro-Negra', rarity: Rarity.EPIC, imageUrl: '/assets/epico-flamengo.png', color: 'bg-red-600', textColor: 'text-white', glowColor: 'shadow-red-500' },
  { name: 'Frango Imperador do Maracanã', rarity: Rarity.LEGENDARY, imageUrl: '/assets/lendario-flamengo.png', color: 'bg-red-600', textColor: 'text-white', glowColor: 'shadow-red-500' },
  { name: 'Frangabriela, a Chama da Nação', rarity: Rarity.ULTRA_LEGENDARY, imageUrl: '/assets/ultra-lendaria-flamengo.png', color: 'bg-fuchsia-500', textColor: 'text-white', glowColor: 'shadow-fuchsia-400' },
  // =================================================================
  // == VASCO ==
  // =================================================================
  { name: 'Frango do Bar em São Januário', rarity: Rarity.COMMON, imageUrl: '/assets/comum-vasco.png', color: 'bg-black', textColor: 'text-white', glowColor: 'shadow-gray-400' },
  { name: 'Frango dos Camisas Negras', rarity: Rarity.UNCOMMON, imageUrl: '/assets/incomum-vasco.png', color: 'bg-black', textColor: 'text-white', glowColor: 'shadow-gray-400' },
  { name: 'Frango do Gol Monumental', rarity: Rarity.RARE, imageUrl: '/assets/raro-vasco.png', color: 'bg-black', textColor: 'text-white', glowColor: 'shadow-gray-400' },
  { name: 'Frango da Construção do Caldeirão', rarity: Rarity.EPIC, imageUrl: '/assets/epico-vasco.png', color: 'bg-black', textColor: 'text-white', glowColor: 'shadow-gray-400' },
  { name: 'Frango Almirante Animal', rarity: Rarity.LEGENDARY, imageUrl: '/assets/lendario-vasco.png', color: 'bg-black', textColor: 'text-white', glowColor: 'shadow-gray-400' },
  { name: 'Vascaina, a Almirante da Colina', rarity: Rarity.ULTRA_LEGENDARY, imageUrl: '/assets/ultra-lendaria-vasco.png', color: 'bg-fuchsia-500', textColor: 'text-white', glowColor: 'shadow-fuchsia-400' },
  // =================================================================
  // == FLUMINENSE ==
  // =================================================================
  { name: 'Frango do Piquenique Tricolor', rarity: Rarity.COMMON, imageUrl: '/assets/comum-fluminense.png', color: 'bg-green-700', textColor: 'text-white', glowColor: 'shadow-green-500' },
  { name: 'Frango do Pó de Arroz', rarity: Rarity.UNCOMMON, imageUrl: '/assets/incomum-fluminense.png', color: 'bg-green-700', textColor: 'text-white', glowColor: 'shadow-green-500' },
  { name: 'Frango do Gol de Barriga', rarity: Rarity.RARE, imageUrl: '/assets/raro-fluminense.png', color: 'bg-green-700', textColor: 'text-white', glowColor: 'shadow-green-500' },
  { name: 'Frango da Máquina Tricolor', rarity: Rarity.EPIC, imageUrl: '/assets/epico-fluminense.png', color: 'bg-green-700', textColor: 'text-white', glowColor: 'shadow-green-500' },
  { name: 'Frango Guerreiro da Libertadores', rarity: Rarity.LEGENDARY, imageUrl: '/assets/lendario-fluminense.png', color: 'bg-green-700', textColor: 'text-white', glowColor: 'shadow-green-500' },
  { name: 'Flumin-chan, a Guerreira Tricolor', rarity: Rarity.ULTRA_LEGENDARY, imageUrl: '/assets/ultra-lendaria-fluminense.png', color: 'bg-fuchsia-500', textColor: 'text-white', glowColor: 'shadow-fuchsia-400' },
  // =================================================================
  // == BOTAFOGO ==
  // =================================================================
  { name: 'Frango do Boteco da Sorte', rarity: Rarity.COMMON, imageUrl: '/assets/comum-botafogo.png', color: 'bg-gray-800', textColor: 'text-white', glowColor: 'shadow-gray-300' },
  { name: 'Frango do Glorioso Biriba', rarity: Rarity.UNCOMMON, imageUrl: '/assets/incomum-botafogo.png', color: 'bg-gray-800', textColor: 'text-white', glowColor: 'shadow-gray-300' },
  { name: 'Frango da Estrela Solitária', rarity: Rarity.RARE, imageUrl: '/assets/raro-botafogo.png', color: 'bg-gray-800', textColor: 'text-white', glowColor: 'shadow-gray-300' },
  { name: 'Frango Anjo das Pernas Tortas', rarity: Rarity.EPIC, imageUrl: '/assets/epico-botafogo.png', color: 'bg-gray-800', textColor: 'text-white', glowColor: 'shadow-gray-300' },
  { name: 'Frango Enciclopédia do Futebol', rarity: Rarity.LEGENDARY, imageUrl: '/assets/lendario-botafogo.png', color: 'bg-gray-800', textColor: 'text-white', glowColor: 'shadow-gray-300' },
  { name: 'Gloriosa, a Estrela Solitária', rarity: Rarity.ULTRA_LEGENDARY, imageUrl: '/assets/ultra-lendaria-botafogo.png', color: 'bg-fuchsia-500', textColor: 'text-white', glowColor: 'shadow-fuchsia-400' },
];