import { UserData, ChickenType } from "../types";
import { CHICKEN_TYPES } from "../constants";

const STORAGE_KEY = "frango-users";
const MAX_PULLS = 100;

export interface UserProfile extends UserData {
  id: string;
  deck: ChickenType[];
  createdAt: number;
  lastPull: number;
}

// Get all registered users
export function getAllUsers(): UserProfile[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

// Find user by username
export function getUserByUsername(username: string): UserProfile | null {
  const users = getAllUsers();
  return users.find(u => u.username === username) || null;
}

// Create new user
export function createUser(username: string): UserProfile {
  const existingUser = getUserByUsername(username);
  if (existingUser) {
    return existingUser;
  }

  const newUser: UserProfile = {
    id: `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    username,
    totalRolls: 0,
    collection: [],
    deck: [],
    lastPull: 0,
    createdAt: Date.now(),
  };

  const users = getAllUsers();
  users.push(newUser);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));

  return newUser;
}

// Add chicken to user's deck
export function addChickenToUser(userId: string, chickenId: string): boolean {
  const users = getAllUsers();
  const userIndex = users.findIndex(u => u.id === userId);

  if (userIndex === -1) return false;

  const user = users[userIndex];

  // Check if max pulls reached
  if (user.totalRolls >= MAX_PULLS) {
    return false;
  }

  // Find chicken and add to deck if not already there
  const chicken = CHICKEN_TYPES.find(c => c.id === chickenId);
  if (!chicken) return false;

  const deckChickenIndex = user.deck.findIndex(c => c.id === chickenId);
  if (deckChickenIndex === -1) {
    user.deck.push(chicken);
  }

  user.totalRolls += 1;
  user.collection.push(chickenId);
  user.lastPull = Date.now();

  users[userIndex] = user;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));

  return true;
}

// Get user deck
export function getUserDeck(userId: string): ChickenType[] {
  const user = getAllUsers().find(u => u.id === userId);
  return user ? user.deck : [];
}

// Get ranking
export function getRanking(): UserProfile[] {
  const users = getAllUsers();
  return users
    .sort((a, b) => {
      // Sort by total rolls (descending), then by creation date (oldest first)
      if (b.totalRolls !== a.totalRolls) {
        return b.totalRolls - a.totalRolls;
      }
      return a.createdAt - b.createdAt;
    })
    .slice(0, 10); // Top 10
}

// Check if user can pull more cards
export function canUserPull(userId: string): boolean {
  const user = getAllUsers().find(u => u.id === userId);
  if (!user) return false;
  return user.totalRolls < MAX_PULLS;
}

// Get remaining pulls for user
export function getRemainingPulls(userId: string): number {
  const user = getAllUsers().find(u => u.id === userId);
  if (!user) return MAX_PULLS;
  return Math.max(0, MAX_PULLS - user.totalRolls);
}

// Export user data
export function exportUserData(userId: string): UserProfile | null {
  return getAllUsers().find(u => u.id === userId) || null;
}

// Get user stats
export function getUserStats(userId: string) {
  const user = getAllUsers().find(u => u.id === userId);
  if (!user) return null;

  const uniqueChickens = new Set(user.collection).size;
  const rarityBreakdown = {
    comum: user.deck.filter(c => c.rarity === "comum").length,
    incomum: user.deck.filter(c => c.rarity === "incomum").length,
    raro: user.deck.filter(c => c.rarity === "raro").length,
    epico: user.deck.filter(c => c.rarity === "epico").length,
    lendario: user.deck.filter(c => c.rarity === "lendario").length,
    "ultra-lendaria": user.deck.filter(c => c.rarity === "ultra-lendaria").length,
  };

  return {
    totalRolls: user.totalRolls,
    uniqueChickens,
    deckSize: user.deck.length,
    remainingPulls: MAX_PULLS - user.totalRolls,
    rarityBreakdown,
    joinDate: new Date(user.createdAt).toLocaleDateString("pt-BR"),
  };
}
