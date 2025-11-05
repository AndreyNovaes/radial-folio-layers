# 🐔 Gacha de Frango - Backend Setup

## 🚀 Quick Start

O backend do Gacha de Frango usa **Vercel API Routes** com **Supabase** (PostgreSQL) para armazenamento persistente.

### 1. Configurar Supabase

1. **Criar conta no Supabase**: https://supabase.com
2. **Criar novo projeto**
3. **Executar o schema SQL**:
   - Vá para: SQL Editor no painel do Supabase
   - Copie e execute o conteúdo de: `api/frango/schema.sql`
   - Verifique se a tabela `frango_users` foi criada

4. **Obter credenciais**:
   - Settings → API
   - Copie: `URL` e `anon/public key`

### 2. Configurar Variáveis de Ambiente

**Vercel (Produção):**
1. Acesse: https://vercel.com/[seu-username]/[seu-projeto]/settings/environment-variables
2. Adicione:
   ```
   SUPABASE_URL=https://[seu-projeto].supabase.co
   SUPABASE_ANON_KEY=[sua-chave-pública]
   ```

**Local (Desenvolvimento):**
Crie `.env` na raiz do projeto:
```bash
SUPABASE_URL=https://[seu-projeto].supabase.co
SUPABASE_ANON_KEY=[sua-chave-pública]
```

### 3. Instalar Dependências

```bash
npm install
```

### 4. Rodar em Desenvolvimento

```bash
npm run dev
```

### 5. Deploy (Vercel)

```bash
vercel --prod
```

O Vercel detectará automaticamente os endpoints em `api/frango/` como API Routes.

## 📁 Estrutura

```
api/frango/
├── schema.sql           # Schema do banco Supabase
├── users-supabase.js    # Funções de banco (Supabase - ATIVO)
├── users.js             # Funções de banco (JSON - DEPRECATED)
├── create-user.js       # POST /api/frango/create-user
├── get-user.js          # GET /api/frango/get-user
├── add-pull.js          # POST /api/frango/add-pull
└── get-ranking.js       # GET /api/frango/get-ranking
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

- **Produção**: **Supabase (PostgreSQL)** - Persistente e escalável ✅
- **Desenvolvimento**: Também usa Supabase (mesmas credenciais)

**Benefícios do Supabase:**
- ✅ Dados persistentes entre deploys
- ✅ Ranking global em tempo real
- ✅ Backups automáticos
- ✅ Row Level Security (RLS)
- ✅ 500MB grátis no plano free

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

1. **Login**: Usuário digita nome → `POST /create-user` → Salva no Supabase
2. **Pull**: Clica botão → `POST /add-pull` → API atualiza Supabase
3. **Ranking**: Carrega página → `GET /get-ranking` → Busca top 10 do Supabase

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

**Erro 500: "Internal server error" no create-user**
- Verifique se as variáveis de ambiente estão configuradas no Vercel
- Verifique se a tabela `frango_users` existe no Supabase
- Cheque os logs do Vercel: `vercel logs [deployment-url]`
- Verifique logs do Supabase: Logs → API

**Erro 404: "User not found"**
- Usuário pode ter sido criado com fallback local (`local-...`)
- Limpe o localStorage do navegador e faça login novamente
- Verifique se o usuário existe no Supabase (Table Editor)

**Erro: "Cannot find module '@supabase/supabase-js'"**
- Execute: `npm install @supabase/supabase-js`
- Faça rebuild: `npm run build`

**Dados não sincronizam entre dispositivos**
- Verifique se está usando Supabase (não JSON local)
- Confirme que API endpoints importam de `users-supabase.js`

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

## 🔄 Migração (JSON → Supabase)

Se você estava usando a versão antiga com JSON:

1. **Dados locais serão perdidos** (não há como migrar automaticamente)
2. **Limpe localStorage dos usuários**:
   - O app detecta IDs `local-*` e limpa automaticamente
3. **Usuários precisam fazer login novamente** no sistema Supabase

**Nota**: A versão antiga (`users.js`) ainda está disponível, mas deprecada.

---

**Última atualização**: Novembro 2024 (Migrado para Supabase)
