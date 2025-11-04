import { ChickenType, Rarity, RarityScore } from "./types";

// Rarity scoring configuration with adjusted drop rates (Ultra Lendária 1%)
export const RARITY_SCORES: Record<Rarity, RarityScore> = {
  [Rarity.COMUM]: {
    rarity: Rarity.COMUM,
    baseWeight: 6700, // ~67%
    points: 1,
    color: "0 0% 70%",
    glowColor: "0 0% 85%",
  },
  [Rarity.INCOMUM]: {
    rarity: Rarity.INCOMUM,
    baseWeight: 1900, // ~19%
    points: 5,
    color: "120 70% 45%",
    glowColor: "120 100% 60%",
  },
  [Rarity.RARO]: {
    rarity: Rarity.RARO,
    baseWeight: 700, // ~7%
    points: 15,
    color: "200 50% 40%",
    glowColor: "200 70% 60%",
  },
  [Rarity.EPICO]: {
    rarity: Rarity.EPICO,
    baseWeight: 400, // ~4%
    points: 50,
    color: "270 80% 50%",
    glowColor: "270 100% 70%",
  },
  [Rarity.LENDARIO]: {
    rarity: Rarity.LENDARIO,
    baseWeight: 200, // ~2%
    points: 150,
    color: "45 85% 60%",
    glowColor: "45 100% 75%",
  },
  [Rarity.ULTRA_LENDARIA]: {
    rarity: Rarity.ULTRA_LENDARIA,
    baseWeight: 100, // ~1%
    points: 500,
    color: "0 100% 50%",
    glowColor: "0 100% 70%",
  },
};

// All chicken types in the game with creative names
export const CHICKEN_TYPES: ChickenType[] = [
  // Flamengo - Comum
  {
    id: "comum-flamengo",
    name: "Frango de Quintal Rubro-Negro",
    team: "Flamengo",
    rarity: Rarity.COMUM,
    imagePath: "/assets/frango/comum-flamengo.png",
    glowColor: "0 100% 50%",
    borderColor: "0 84.2% 60.2%",
  },
  // Flamengo - Incomum
  {
    id: "incomum-flamengo",
    name: "O Sabor da Nação",
    team: "Flamengo",
    rarity: Rarity.INCOMUM,
    imagePath: "/assets/frango/incomum-flamengo.png",
    glowColor: "120 100% 60%",
    borderColor: "120 70% 45%",
  },
  // Flamengo - Raro
  {
    id: "raro-flamengo",
    name: "Frango do Gol de Ouro",
    team: "Flamengo",
    rarity: Rarity.RARO,
    imagePath: "/assets/frango/raro-flamengo.png",
    glowColor: "200 70% 60%",
    borderColor: "200 50% 40%",
  },
  // Flamengo - Épico
  {
    id: "epico-flamengo",
    name: "O Messias do Maracanã",
    team: "Flamengo",
    rarity: Rarity.EPICO,
    imagePath: "/assets/frango/epico-flamengo.png",
    glowColor: "270 100% 70%",
    borderColor: "270 80% 50%",
  },
  // Flamengo - Lendário
  {
    id: "lendario-flamengo",
    name: "Fênix Rubro-Negra Coroada",
    team: "Flamengo",
    rarity: Rarity.LENDARIO,
    imagePath: "/assets/frango/lendario-flamengo.png",
    glowColor: "45 100% 75%",
    borderColor: "45 85% 60%",
  },
  // Flamengo - Ultra Lendária
  {
    id: "ultra-lendaria-flamengo",
    name: "Frangabriela, a Chama da Nação",
    team: "Flamengo",
    rarity: Rarity.ULTRA_LENDARIA,
    imagePath: "/assets/frango/ultra-lendaria-flamengo.png",
    glowColor: "0 100% 70%",
    borderColor: "0 100% 50%",
  },

  // Vasco - Comum
  {
    id: "comum-vasco",
    name: "Galo de Bar do Gigante",
    team: "Vasco",
    rarity: Rarity.COMUM,
    imagePath: "/assets/frango/comum-vasco.png",
    glowColor: "0 100% 50%",
    borderColor: "0 84.2% 60.2%",
  },
  // Vasco - Incomum
  {
    id: "incomum-vasco",
    name: "Frango à Camisas Negras",
    team: "Vasco",
    rarity: Rarity.INCOMUM,
    imagePath: "/assets/frango/incomum-vasco.png",
    glowColor: "120 100% 60%",
    borderColor: "120 70% 45%",
  },
  // Vasco - Raro
  {
    id: "raro-vasco",
    name: "Voleio de São Januário",
    team: "Vasco",
    rarity: Rarity.RARO,
    imagePath: "/assets/frango/raro-vasco.png",
    glowColor: "200 70% 60%",
    borderColor: "200 50% 40%",
  },
  // Vasco - Épico
  {
    id: "epico-vasco",
    name: "O Construtor da Colina",
    team: "Vasco",
    rarity: Rarity.EPICO,
    imagePath: "/assets/frango/epico-vasco.png",
    glowColor: "270 100% 70%",
    borderColor: "270 80% 50%",
  },
  // Vasco - Lendário
  {
    id: "lendario-vasco",
    name: "Galeão do Almirante Assado",
    team: "Vasco",
    rarity: Rarity.LENDARIO,
    imagePath: "/assets/frango/lendario-vasco.png",
    glowColor: "45 100% 75%",
    borderColor: "45 85% 60%",
  },
  // Vasco - Ultra Lendária
  {
    id: "ultra-lendaria-vasco",
    name: "Vascaina, a Almirante da Colina",
    team: "Vasco",
    rarity: Rarity.ULTRA_LENDARIA,
    imagePath: "/assets/frango/ultra-lendaria-vasco.png",
    glowColor: "0 100% 70%",
    borderColor: "0 100% 50%",
  },

  // Fluminense - Comum
  {
    id: "comum-fluminense",
    name: "Piquenique Tricolor nas Laranjeiras",
    team: "Fluminense",
    rarity: Rarity.COMUM,
    imagePath: "/assets/frango/comum-fluminense.png",
    glowColor: "0 100% 50%",
    borderColor: "0 84.2% 60.2%",
  },
  // Fluminense - Incomum
  {
    id: "incomum-fluminense",
    name: "Supremo de Frango ao Pó de Arroz",
    team: "Fluminense",
    rarity: Rarity.INCOMUM,
    imagePath: "/assets/frango/incomum-fluminense.png",
    glowColor: "120 100% 60%",
    borderColor: "120 70% 45%",
  },
  // Fluminense - Raro
  {
    id: "raro-fluminense",
    name: "O Artilheiro de Barriga",
    team: "Fluminense",
    rarity: Rarity.RARO,
    imagePath: "/assets/frango/raro-fluminense.png",
    glowColor: "200 70% 60%",
    borderColor: "200 50% 40%",
  },
  // Fluminense - Épico
  {
    id: "epico-fluminense",
    name: "A Máquina de Frango Tricolor",
    team: "Fluminense",
    rarity: Rarity.EPICO,
    imagePath: "/assets/frango/epico-fluminense.png",
    glowColor: "270 100% 70%",
    borderColor: "270 80% 50%",
  },
  // Fluminense - Lendário
  {
    id: "lendario-fluminense",
    name: "O Conquistador da Glória Eterna",
    team: "Fluminense",
    rarity: Rarity.LENDARIO,
    imagePath: "/assets/frango/lendario-fluminense.png",
    glowColor: "45 100% 75%",
    borderColor: "45 85% 60%",
  },
  // Fluminense - Ultra Lendária
  {
    id: "ultra-lendaria-fluminense",
    name: "Flumin-chan, a Guerreira Tricolor",
    team: "Fluminense",
    rarity: Rarity.ULTRA_LENDARIA,
    imagePath: "/assets/frango/ultra-lendaria-fluminense.png",
    glowColor: "0 100% 70%",
    borderColor: "0 100% 50%",
  },

  // Botafogo - Comum
  {
    id: "comum-botafogo",
    name: "Frango no Balcão Alvinegro",
    team: "Botafogo",
    rarity: Rarity.COMUM,
    imagePath: "/assets/frango/comum-botafogo.png",
    glowColor: "0 100% 50%",
    borderColor: "0 84.2% 60.2%",
  },
  // Botafogo - Incomum
  {
    id: "incomum-botafogo",
    name: "O Frango da Sorte do Biriba",
    team: "Botafogo",
    rarity: Rarity.INCOMUM,
    imagePath: "/assets/frango/incomum-botafogo.png",
    glowColor: "120 100% 60%",
    borderColor: "120 70% 45%",
  },
  // Botafogo - Raro
  {
    id: "raro-botafogo",
    name: "A Estrela Solitária no Prato",
    team: "Botafogo",
    rarity: Rarity.RARO,
    imagePath: "/assets/frango/raro-botafogo.png",
    glowColor: "200 70% 60%",
    borderColor: "200 50% 40%",
  },
  // Botafogo - Épico
  {
    id: "epico-botafogo",
    name: "Anjo das Pernas Tostadas",
    team: "Botafogo",
    rarity: Rarity.EPICO,
    imagePath: "/assets/frango/epico-botafogo.png",
    glowColor: "270 100% 70%",
    borderColor: "270 80% 50%",
  },
  // Botafogo - Lendário
  {
    id: "lendario-botafogo",
    name: "Frango Enciclopédico de Nilton Santos",
    team: "Botafogo",
    rarity: Rarity.LENDARIO,
    imagePath: "/assets/frango/lendario-botafogo.png",
    glowColor: "45 100% 75%",
    borderColor: "45 85% 60%",
  },
  // Botafogo - Ultra Lendária
  {
    id: "ultra-lendaria-botafogo",
    name: "Gloriosa, a Estrela Solitária",
    team: "Botafogo",
    rarity: Rarity.ULTRA_LENDARIA,
    imagePath: "/assets/frango/ultra-lendaria-botafogo.png",
    glowColor: "0 100% 70%",
    borderColor: "0 100% 50%",
  },
];

// Helper function to get a random chicken based on weighted probabilities
export function getRandomChicken(): ChickenType {
  const totalWeight = Object.values(RARITY_SCORES).reduce(
    (sum, score) => sum + score.baseWeight,
    0
  );

  let random = Math.random() * totalWeight;
  let currentWeight = 0;

  for (const rarity of Object.values(Rarity)) {
    const score = RARITY_SCORES[rarity];
    currentWeight += score.baseWeight;
    if (random <= currentWeight) {
      const chickensOfRarity = CHICKEN_TYPES.filter(c => c.rarity === rarity);
      return chickensOfRarity[
        Math.floor(Math.random() * chickensOfRarity.length)
      ];
    }
  }

  return CHICKEN_TYPES[Math.floor(Math.random() * CHICKEN_TYPES.length)];
}
