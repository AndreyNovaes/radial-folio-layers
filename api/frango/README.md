# 🐔 Gacha Frango API

API Routes para o jogo Gacha de Frango usando Supabase.

## ⚡ Quick Setup

### 1. Configure Supabase

Crie tabela executando `schema.sql` no SQL Editor do Supabase.

### 2. Configure Environment Variables

**Vercel:**
```
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
```

**Local (.env):**
```bash
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
```

### 3. Deploy

```bash
npm install
vercel --prod
```

## 📂 Files

- `schema.sql` - Database schema (run in Supabase)
- `users-supabase.js` - Database functions (ACTIVE)
- `users.js` - Old JSON storage (DEPRECATED)
- `create-user.js` - POST /api/frango/create-user
- `get-user.js` - GET /api/frango/get-user
- `add-pull.js` - POST /api/frango/add-pull
- `get-ranking.js` - GET /api/frango/get-ranking

## 🔍 Endpoints

### Create/Get User
```bash
POST /api/frango/create-user
Content-Type: application/json

{
  "username": "PlayerName"
}
```

### Get User
```bash
GET /api/frango/get-user?id=user-123
```

### Add Pull
```bash
POST /api/frango/add-pull
Content-Type: application/json

{
  "userId": "user-123",
  "chickenId": "raro-flamengo"
}
```

### Get Ranking
```bash
GET /api/frango/get-ranking
```

## 🐛 Common Issues

**500 Error**: Check environment variables in Vercel
**404 Error**: Check if table exists in Supabase
**Missing module**: Run `npm install @supabase/supabase-js`

## 📖 Full Documentation

See `/FRANGO_BACKEND.md` for complete setup guide.
