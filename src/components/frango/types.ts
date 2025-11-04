// Game data types
export enum Rarity {
  COMUM = "comum",
  INCOMUM = "incomum",
  RARO = "raro",
  EPICO = "epico",
  LENDARIO = "lendario",
  ULTRA_LENDARIA = "ultra-lendaria",
}

export interface ChickenType {
  id: string;
  name: string;
  team: "Flamengo" | "Vasco" | "Fluminense" | "Botafogo";
  rarity: Rarity;
  imagePath: string;
  glowColor: string; // HSL value matching portfolio theme
  borderColor: string; // HSL value matching portfolio theme
}

export interface UserData {
  username: string;
  totalRolls: number;
  collection: string[]; // Array of chicken IDs
  lastRoll: number;
  createdAt: number;
  totalSpent?: number;
}

export interface LeaderboardPlayer {
  username: string;
  totalRolls: number;
  collection: ChickenType[];
}

export interface RarityScore {
  rarity: Rarity;
  baseWeight: number;
  points: number;
  color: string; // HSL value
  glowColor: string; // HSL value
}

export interface EventConfig {
  name: string;
  startDate: number;
  endDate: number;
  multiplier: number;
  description: string;
}
