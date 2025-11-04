import { addChickenToUserDb, findUserById } from './users.js';

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { userId, chickenId } = req.body;

    if (!userId || !chickenId) {
      return res.status(400).json({ error: 'userId and chickenId are required' });
    }

    // Add chicken to user
    const success = addChickenToUserDb(userId, chickenId);
    if (!success) {
      return res.status(400).json({ error: 'Could not add chicken. Max pulls reached?' });
    }

    // Return updated user
    const user = findUserById(userId);
    return res.status(200).json(user);
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
