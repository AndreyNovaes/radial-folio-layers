// API Service para comunicação com o backend
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

export interface User {
  username: string;
  password?: string;
  score: number;
  rollsToday: number;
  lastRollDate: string;
  collection: any[];
  cardsCount?: number;
  createdAt?: string;
}

export interface Roll {
  username: string;
  chicken: any;
  timestamp: string;
}

// Auth
export async function login(username: string, password: string): Promise<User> {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Erro ao fazer login');
  }

  const data = await response.json();
  return data.user;
}

// Registrar puxada
export async function addRoll(username: string, chicken: any): Promise<User> {
  const response = await fetch(`${API_URL}/rolls/add`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, chicken })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Erro ao registrar puxada');
  }

  const data = await response.json();
  return data.user;
}

// Obter ranking
export async function getRanking(): Promise<any[]> {
  const response = await fetch(`${API_URL}/ranking`);

  if (!response.ok) {
    throw new Error('Erro ao obter ranking');
  }

  const data = await response.json();
  return data.ranking;
}

// Obter feed (puxadas recentes de todos)
export async function getFeed(): Promise<Roll[]> {
  const response = await fetch(`${API_URL}/feed`);

  if (!response.ok) {
    throw new Error('Erro ao obter feed');
  }

  const data = await response.json();
  return data.feed;
}

// Obter puxadas de um usuário
export async function getUserRolls(username: string): Promise<Roll[]> {
  const response = await fetch(`${API_URL}/users/${username}/rolls`);

  if (!response.ok) {
    throw new Error('Erro ao obter puxadas');
  }

  const data = await response.json();
  return data.rolls;
}

// Obter coleção de um usuário
export async function getUserCollection(username: string): Promise<any[]> {
  const response = await fetch(`${API_URL}/users/${username}/collection`);

  if (!response.ok) {
    throw new Error('Erro ao obter coleção');
  }

  const data = await response.json();
  return data.collection;
}

// Obter dados públicos de um usuário
export async function getUser(username: string): Promise<any> {
  const response = await fetch(`${API_URL}/users/${username}`);

  if (!response.ok) {
    throw new Error('Erro ao obter usuário');
  }

  return await response.json();
}

// Health check
export async function healthCheck(): Promise<boolean> {
  try {
    const response = await fetch(`${API_URL}/health`);
    return response.ok;
  } catch {
    return false;
  }
}
