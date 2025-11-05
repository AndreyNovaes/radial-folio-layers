import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.join(__dirname, '../../data/frango.json');

// In-memory fallback for Vercel serverless
let memoryDb = { users: [] };

function ensureDataDir() {
  const dir = path.dirname(dbPath);
  try {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  } catch (error) {
    console.log('Warning: Cannot create data directory (expected on Vercel)');
  }
}

function readDb() {
  try {
    ensureDataDir();
    if (fs.existsSync(dbPath)) {
      const data = fs.readFileSync(dbPath, 'utf-8');
      memoryDb = JSON.parse(data);
      return memoryDb;
    }
  } catch (error) {
    console.log('Using in-memory database');
  }
  return memoryDb;
}

function writeDb(data) {
  memoryDb = data;
  try {
    ensureDataDir();
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.log('Cannot write to filesystem (Vercel serverless), using memory only');
  }
}

// Get all users
export function getUsers() {
  const db = readDb();
  return db.users;
}

// Find user by username
export function findUserByUsername(username) {
  const db = readDb();
  return db.users.find(u => u.username === username) || null;
}

// Find user by ID
export function findUserById(userId) {
  const db = readDb();
  return db.users.find(u => u.id === userId) || null;
}

// Create new user
export function createNewUser(username) {
  const db = readDb();

  const newUser = {
    id: `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    username,
    totalRolls: 0,
    collection: [],
    deck: [],
    lastPull: 0,
    createdAt: Date.now(),
  };

  db.users.push(newUser);
  writeDb(db);

  return newUser;
}

// Add chicken to user's deck
export function addChickenToUserDb(userId, chickenId) {
  const db = readDb();

  const userIndex = db.users.findIndex(u => u.id === userId);
  if (userIndex === -1) return false;

  const user = db.users[userIndex];

  // Check if max pulls reached
  if (user.totalRolls >= 100) {
    return false;
  }

  // Add to collection
  user.totalRolls += 1;
  user.collection.push(chickenId);
  user.lastPull = Date.now();

  db.users[userIndex] = user;
  writeDb(db);

  return true;
}

// Get ranking (top 10)
export function getRankingDb() {
  const db = readDb();

  return db.users
    .sort((a, b) => {
      // Sort by total rolls (descending), then by creation date (oldest first)
      if (b.totalRolls !== a.totalRolls) {
        return b.totalRolls - a.totalRolls;
      }
      return a.createdAt - b.createdAt;
    })
    .slice(0, 10);
}

// Get user with deck
export function getUserWithDeck(userId) {
  const db = readDb();
  return db.users.find(u => u.id === userId) || null;
}
