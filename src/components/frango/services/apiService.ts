import { UserProfile } from "./rankingService";

// Use relative path - Vite proxy handles routing to localhost:3001 in dev
const API_BASE = "/api/frango";

// Create or get user
export async function createOrGetUser(username: string): Promise<UserProfile> {
  try {
    const response = await fetch(`${API_BASE}/create-user`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username }),
    });

    if (!response.ok) {
      throw new Error("Failed to create/get user");
    }

    return response.json();
  } catch (error) {
    console.error("Error creating user:", error);
    // Fallback to localStorage if API fails
    return {
      id: `local-${username}-${Date.now()}`,
      username,
      totalRolls: 0,
      collection: [],
      deck: [],
      lastPull: 0,
      createdAt: Date.now(),
    };
  }
}

// Get user by ID
export async function getUser(userId: string): Promise<UserProfile | null> {
  try {
    const response = await fetch(`${API_BASE}/get-user?id=${userId}`);

    if (!response.ok) {
      return null;
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}

// Add chicken pull
export async function addPull(userId: string, chickenId: string): Promise<UserProfile | null> {
  try {
    const response = await fetch(`${API_BASE}/add-pull`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, chickenId }),
    });

    if (!response.ok) {
      throw new Error("Failed to add pull");
    }

    return response.json();
  } catch (error) {
    console.error("Error adding pull:", error);
    return null;
  }
}

// Get ranking
export async function getRanking(): Promise<UserProfile[]> {
  try {
    const response = await fetch(`${API_BASE}/get-ranking`);

    if (!response.ok) {
      throw new Error("Failed to fetch ranking");
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching ranking:", error);
    return [];
  }
}
