# Backend - Gacha de Frango

## 🚀 Visão Geral

O backend é um servidor **Node.js com Express** que fornece:

✅ Autenticação de usuários
✅ Persistência em JSON (lowdb)
✅ API REST para todas as operações
✅ Ranking em tempo real
✅ Feed de puxadas de todos os jogadores

## 📁 Estrutura

```
server/
├── index.js          # Servidor principal
├── package.json      # Dependências
├── db.json          # Database (criado automaticamente)
└── node_modules/    # Pacotes instalados
```

## 🛠️ Setup

### 1. Instalar Dependências

```bash
cd server
npm install
```

### 2. Rodar o Servidor

**Produção:**
```bash
npm start
```

**Desenvolvimento (com auto-reload):**
```bash
npm install -D nodemon
npm run dev
```

### 3. Verificar se está funcionando

```bash
curl http://localhost:3001/api/health
# Resposta: {"status":"OK"}
```

## 📡 API Endpoints

### Autenticação

**POST** `/api/auth/login`
- Registra novo usuário ou faz login
- Body: `{ "username": "seu_user", "password": "sua_senha" }`
- Response: `{ "user": { ... } }`

### Puxadas

**POST** `/api/rolls/add`
- Registra uma puxada no ranking
- Body: `{ "username": "seu_user", "chicken": { ... } }`
- Response: `{ "user": { ... } }`

**GET** `/api/users/:username/rolls`
- Obtém últimas puxadas de um usuário
- Response: `{ "rolls": [ ... ] }`

### Ranking

**GET** `/api/ranking`
- Obtém top 10 jogadores
- Response: `{ "ranking": [ { "username", "score", "cardsCount" } ] }`

### Feed

**GET** `/api/feed`
- Obtém últimas 50 puxadas de TODOS os jogadores
- Response: `{ "feed": [ { "username", "chicken", "timestamp" } ] }`

### Usuários

**GET** `/api/users/:username`
- Obtém dados públicos de um usuário
- Response: `{ "username", "score", "cardsCount", "createdAt" }`

**GET** `/api/users/:username/collection`
- Obtém coleção completa de um usuário
- Response: `{ "collection": [ ... ] }`

## 💾 Database (db.json)

A database é um arquivo JSON simples com essa estrutura:

```json
{
  "users": {
    "usuario1": {
      "username": "usuario1",
      "password": "senha123",
      "score": 5500,
      "rollsToday": 23,
      "lastRollDate": "2025-11-03",
      "collection": [ ... ],
      "createdAt": "2025-11-03T10:00:00.000Z"
    }
  },
  "rolls": [
    {
      "username": "usuario1",
      "chicken": { ... },
      "timestamp": "2025-11-03T10:05:00.000Z"
    }
  ]
}
```

## 🔗 Conectar Frontend ao Backend

### 1. Instalar dotenv no frontend

```bash
npm install dotenv
```

### 2. Criar arquivo `.env`

No diretório raiz do frontend (`gacha_frango/`), crie um arquivo `.env`:

```
REACT_APP_API_URL=http://localhost:3001/api
```

### 3. Usar o serviço de API

```typescript
import * as api from './services/api';

// Login
const user = await api.login('usuario', 'senha');

// Registrar puxada
const updatedUser = await api.addRoll('usuario', chicken);

// Obter ranking
const ranking = await api.getRanking();

// Obter feed
const feed = await api.getFeed();
```

## 📊 Ver Dados do Banco

Abra o arquivo `server/db.json` com um editor de texto para ver/editar dados.

Ou via Node:

```javascript
const { Low } = require('lowdb');
const { JSONFile } = require('lowdb/node');

const db = new Low(new JSONFile('./db.json'));
await db.read();
console.log(db.data);
```

## 🚀 Deployar para Produção

### Opção 1: Heroku

```bash
cd server
heroku login
heroku create seu-app-name
git push heroku main
```

### Opção 2: Railway.app

```bash
npm i -g railway
railway login
railway link
railway up
```

### Opção 3: Render

1. Push para GitHub
2. Conectar repositório no Render.com
3. Definir root directory como `server`
4. Deploy

## 🔒 Segurança

**⚠️ AVISO:** Este é um projeto de brincadeira!

Para produção:
- Use bcrypt para senhas
- Adicione autenticação JWT
- Valide inputs no servidor
- Use HTTPS
- Implemente rate limiting
- Use um banco real (PostgreSQL, MongoDB)

## 🐛 Troubleshooting

### Port já em uso

Se a porta 3001 está em uso:

```bash
# Mac/Linux: Encontrar processo
lsof -i :3001
kill -9 <PID>

# Windows:
netstat -ano | findstr :3001
taskkill /PID <PID> /F
```

Ou mudar port no `.env`:

```
PORT=3002
```

### Erro de CORS

Certifique-se que o frontend faz requisições para `http://localhost:3001/api`.

No frontend, configure:

```typescript
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';
```

### Database corrompida

Delete `server/db.json` e será recriado automaticamente:

```bash
rm server/db.json
npm start
```

## 📚 Próximos Passos

- [ ] Adicionar autenticação JWT
- [ ] Criptografar senhas com bcrypt
- [ ] Migrar para PostgreSQL
- [ ] Adicionar WebSocket para atualizações em tempo real
- [ ] Implementar sistema de amigos
- [ ] Adicionar filtros ao ranking

---

**Desenvolvido com ❤️ e 🍗**
