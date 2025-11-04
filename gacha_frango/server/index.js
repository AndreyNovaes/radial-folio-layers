const express = require('express');
const cors = require('cors');
const { Low } = require('lowdb');
const { JSONFile } = require('lowdb/node');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Database setup
const dbPath = path.join(__dirname, 'db.json');
const adapter = new JSONFile(dbPath);
const db = new Low(adapter);

// Initialize DB
async function initDB() {
  await db.read();
  if (!db.data) {
    db.data = {
      users: {},
      rolls: [] // Histórico de todas as puxadas
    };
    await db.write();
  }
}

// ==================== ROTAS ====================

// Registrar/Login
app.post('/api/auth/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username e password obrigatórios' });
  }

  await db.read();

  // Se usuário não existe, criar
  if (!db.data.users[username]) {
    db.data.users[username] = {
      username,
      password,
      score: 0,
      rollsToday: 100,
      lastRollDate: new Date().toISOString().split('T')[0],
      collection: [],
      createdAt: new Date().toISOString()
    };
    await db.write();
    return res.json({ message: 'Usuário criado com sucesso!', user: db.data.users[username] });
  }

  // Verificar senha
  const user = db.data.users[username];
  if (user.password !== password) {
    return res.status(401).json({ error: 'Senha incorreta' });
  }

  // Reset diário
  const today = new Date().toISOString().split('T')[0];
  if (user.lastRollDate !== today) {
    user.rollsToday = 100;
    user.lastRollDate = today;
    await db.write();
  }

  res.json({ user });
});

// Registrar puxada
app.post('/api/rolls/add', async (req, res) => {
  const { username, chicken } = req.body;

  if (!username || !chicken) {
    return res.status(400).json({ error: 'Username e chicken obrigatórios' });
  }

  await db.read();

  if (!db.data.users[username]) {
    return res.status(404).json({ error: 'Usuário não encontrado' });
  }

  const user = db.data.users[username];

  // Adicionar à coleção
  user.collection.push(chicken);
  user.rollsToday--;
  user.score += getScoreForRarity(chicken.rarity);

  // Adicionar ao histórico global
  db.data.rolls.push({
    username,
    chicken,
    timestamp: new Date().toISOString()
  });

  await db.write();

  res.json({ message: 'Puxada registrada!', user });
});

// Obter coleção de um usuário
app.get('/api/users/:username/collection', async (req, res) => {
  const { username } = req.params;

  await db.read();

  if (!db.data.users[username]) {
    return res.status(404).json({ error: 'Usuário não encontrado' });
  }

  res.json({ collection: db.data.users[username].collection });
});

// Obter ranking
app.get('/api/ranking', async (req, res) => {
  await db.read();

  const ranking = Object.values(db.data.users)
    .map(user => ({
      username: user.username,
      score: user.score,
      cardsCount: user.collection.length
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);

  res.json({ ranking });
});

// Obter todas as puxadas (feed)
app.get('/api/feed', async (req, res) => {
  await db.read();

  const feed = db.data.rolls
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    .slice(0, 50); // Últimas 50 puxadas

  res.json({ feed });
});

// Obter puxadas de um usuário
app.get('/api/users/:username/rolls', async (req, res) => {
  const { username } = req.params;

  await db.read();

  const userRolls = db.data.rolls
    .filter(roll => roll.username === username)
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    .slice(0, 20);

  res.json({ rolls: userRolls });
});

// Obter dados de um usuário (público)
app.get('/api/users/:username', async (req, res) => {
  const { username } = req.params;

  await db.read();

  if (!db.data.users[username]) {
    return res.status(404).json({ error: 'Usuário não encontrado' });
  }

  const user = db.data.users[username];

  res.json({
    username: user.username,
    score: user.score,
    cardsCount: user.collection.length,
    createdAt: user.createdAt
  });
});

// Helper function
function getScoreForRarity(rarity) {
  const scores = {
    'Comum': 1,
    'Incomum': 3,
    'Raro': 10,
    'Épico': 25,
    'Lendário': 100,
    'Ultra-Lendária': 500
  };
  return scores[rarity] || 0;
}

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK' });
});

// ==================== START SERVER ====================
initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🍗 Servidor Gacha rodando em http://localhost:${PORT}`);
    console.log(`📊 Database: ${dbPath}`);
  });
});
