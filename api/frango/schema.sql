-- 🐔 Gacha de Frango - Supabase Database Schema
-- Execute este SQL no Supabase SQL Editor para criar a estrutura do banco

-- Tabela principal de usuários
CREATE TABLE IF NOT EXISTS frango_users (
  id TEXT PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  totalRolls INTEGER DEFAULT 0 CHECK (totalRolls >= 0 AND totalRolls <= 100),
  collection JSONB DEFAULT '[]'::jsonb,
  deck JSONB DEFAULT '[]'::jsonb,
  lastPull TIMESTAMP WITH TIME ZONE,
  createdAt TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índice para busca rápida por username
CREATE INDEX IF NOT EXISTS idx_frango_username ON frango_users(username);

-- Índice para ranking (ordenado por totalRolls DESC, depois por createdAt ASC)
CREATE INDEX IF NOT EXISTS idx_frango_ranking ON frango_users(totalRolls DESC, createdAt ASC);

-- Índice para buscar usuários por data de criação
CREATE INDEX IF NOT EXISTS idx_frango_created ON frango_users(createdAt DESC);

-- Comentários para documentação
COMMENT ON TABLE frango_users IS 'Armazena dados dos jogadores do Gacha de Frango';
COMMENT ON COLUMN frango_users.id IS 'ID único gerado pelo sistema (formato: user-timestamp-random)';
COMMENT ON COLUMN frango_users.username IS 'Nome do usuário (único)';
COMMENT ON COLUMN frango_users.totalRolls IS 'Total de pulls realizados (máximo 100)';
COMMENT ON COLUMN frango_users.collection IS 'Array JSON com IDs dos frangos coletados';
COMMENT ON COLUMN frango_users.deck IS 'Array JSON com objetos completos dos frangos (deprecated)';
COMMENT ON COLUMN frango_users.lastPull IS 'Timestamp do último pull';
COMMENT ON COLUMN frango_users.createdAt IS 'Data de criação da conta';

-- Habilitar Row Level Security (RLS) - IMPORTANTE para segurança
ALTER TABLE frango_users ENABLE ROW LEVEL SECURITY;

-- Política: Qualquer pessoa pode ler todos os usuários (para ranking)
CREATE POLICY "Allow public read access" ON frango_users
  FOR SELECT
  USING (true);

-- Política: Qualquer pessoa pode criar novos usuários
CREATE POLICY "Allow public insert" ON frango_users
  FOR INSERT
  WITH CHECK (true);

-- Política: Qualquer pessoa pode atualizar qualquer usuário
-- NOTA: Em produção, você deve restringir isso com autenticação JWT
CREATE POLICY "Allow public update" ON frango_users
  FOR UPDATE
  USING (true);

-- Exemplo de dados para teste (opcional - remova em produção)
-- INSERT INTO frango_users (id, username, totalRolls, collection, createdAt)
-- VALUES
--   ('user-test-1', 'TestPlayer1', 10, '["comum-normal", "raro-corinthians"]'::jsonb, NOW() - INTERVAL '5 days'),
--   ('user-test-2', 'TestPlayer2', 25, '["comum-caipira", "epico-flamengo"]'::jsonb, NOW() - INTERVAL '3 days'),
--   ('user-test-3', 'TestPlayer3', 50, '["lendario-galo"]'::jsonb, NOW() - INTERVAL '1 day');

-- Verificar que a tabela foi criada corretamente
SELECT
  schemaname,
  tablename,
  tableowner
FROM pg_tables
WHERE tablename = 'frango_users';

-- Verificar índices criados
SELECT
  indexname,
  indexdef
FROM pg_indexes
WHERE tablename = 'frango_users';
