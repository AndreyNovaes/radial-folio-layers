# 🐔 Gacha de Frango - Backend Setup

## 🚀 Quick Start

O backend do Gacha de Frango usa **Vercel API Routes** com armazenamento em **JSON** para simplicidade.

### 1. Instalar Dependências

```bash
npm install
```

### 2. Criar Pasta de Dados (Desenvolvimento)

```bash
mkdir -p data
```

### 3. Rodar em Desenvolvimento

```bash
# Terminal 1: Frontend
npm run dev

# Terminal 2: Em outra janela (opcional - local apenas)
npm run dev:api
```

### 4. Deploy (Vercel)

```bash
vercel --prod
```

O Vercel detectará automaticamente os endpoints em `api/frango/` como API Routes.

## 📁 Estrutura

```
api/frango/
├── users.ts           # Funções de banco de dados
├── create-user.ts     # POST /api/frango/create-user
├── get-user.ts        # GET /api/frango/get-user
├── add-pull.ts        # POST /api/frango/add-pull
└── get-ranking.ts     # GET /api/frango/get-ranking
```

## 🔌 Endpoints da API

### Criar/Buscar Usuário
```
POST /api/frango/create-user
Body: { "username": "João" }
Response: { ...UserProfile }
```

### Buscar Usuário
```
GET /api/frango/get-user?id=user-123
Response: { ...UserProfile } ou 404
```

### Adicionar Pull
```
POST /api/frango/add-pull
Body: { "userId": "user-123", "chickenId": "raro-flamengo" }
Response: { ...UserProfile } ou error
```

### Obter Ranking
```
GET /api/frango/get-ranking
Response: [ UserProfile[], ... ] (top 10)
```

## 💾 Armazenamento

- **Desenvolvimento**: JSON file em `data/frango.json`
- **Produção (Vercel)**: JSON file em `/tmp/data/frango.json` (temporário por deployment)

**Nota**: Para produção persistente, considere integrar com:
- Supabase (PostgreSQL)
- Firebase Realtime Database
- MongoDB Atlas

## 📝 Dados do Usuário

```typescript
interface UserProfile {
  id: string;
  username: string;
  totalRolls: number;        // 0-100
  collection: string[];      // chickenIds
  deck: ChickenType[];       // objetos completos dos frangos
  lastPull: number;          // timestamp
  createdAt: number;         // timestamp
}
```

## 🎮 Como Funciona

1. **Login**: Usuário digita nome → `POST /create-user`
2. **Pull**: Clica botão → `POST /add-pull` → API salva no JSON
3. **Ranking**: Carrega página → `GET /get-ranking` → Exibe top 10

## 🔒 Segurança (Desenvolvimento)

- Sem autenticação (simples para protótipo)
- Sem validação de dados (adicionar em produção)
- Sem rate limiting (adicionar em produção)

**Para produção**, adicione:
- JWT authentication
- Input validation
- Rate limiting
- Backup do banco de dados

## 🐛 Troubleshooting

**Erro: "Cannot find module 'fs'"**
- Node.js 18+ é obrigatório
- Verificar `package.json` > `"type": "module"`

**Ranking não atualiza em tempo real**
- JSON é atualizado apenas em disco
- Atualizar manualmente com `getRanking()`

**Dados perdidos após deploy**
- Vercel serverless functions não persistem arquivos
- Usar banco de dados real em produção

## 📊 Exemplo Completo

```javascript
// Frontend (FrangoApp.tsx)
const user = await createOrGetUser("João");
// POST /api/frango/create-user → { id: "user-123...", ... }

await addPull(user.id, "raro-flamengo");
// POST /api/frango/add-pull → atualiza user.totalRolls

const ranking = await getRanking();
// GET /api/frango/get-ranking → [ { rank 1 }, { rank 2 }, ... ]
```

---

**Última atualização**: Novembro 2024
