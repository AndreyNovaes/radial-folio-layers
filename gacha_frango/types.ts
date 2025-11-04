
export enum Rarity {
  COMMON = 'Comum',
  UNCOMMON = 'Incomum',
  RARE = 'Raro',
  EPIC = 'Épico',
  LEGENDARY = 'Lendário',
  ULTRA_LEGENDARY = 'Ultra-Lendária',
}

export interface ChickenType {
  name: string;
  rarity: Rarity;
  imageUrl: string;
  color: string;
  textColor: string;
  glowColor: string;
}

export interface UserData {
  username: string;
  password: string;
  rollsToday: number;
  lastRollDate: string; // YYYY-MM-DD
  score: number;
  collection: ChickenType[];
}

export interface LeaderboardPlayer {
  username: string;
  score: number;
  collection?: ChickenType[];
}
