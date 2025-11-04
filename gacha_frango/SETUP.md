# Gacha de Frango - Setup e Instruções

## Sobre
Um app interativo de gacha de frango assado! Crie uma conta, faça login e puxe cartas dos 4 grandes times do Rio (Flamengo, Vasco, Fluminense e Botafogo).

## Principais Funcionalidades

✅ **Sistema de Autenticação**
- Crie uma conta com usuário e senha
- Faça login para recuperar sua coleção de cartas
- Senha simples (é só uma brincadeira!)

✅ **Sistema de Gacha**
- 100 puxadas diárias que reseta às 18:00
- 6 níveis de raridade (Comum → Ultra-Lendária)
- Pontuação baseada na raridade

✅ **Persistência de Dados**
- Todas as cartas puxadas são salvas no localStorage
- Pontuação, rolls diários e coleção são persistidos por usuário
- Dados continuam após fechar e reabrir o navegador

✅ **Sistema de Ranking**
- Top 5 players por pontuação
- Atualiza em tempo real
- Visualize o deck de cada jogador do top 5
  - Veja todas as cartas que cada jogador possui
  - Conte quantas cópias de cada carta o jogador tem
  - Filtre por raridade para analisar a coleção
  - Veja estatísticas de distribuição de raridade

✅ **Sistema de Eventos**
- Eventos dinâmicos que aumentam chances
- Atualmente: 🎉 **Festival de Frangos** (3x Ultra-Lendária)
- Banner de evento com animação pulsante
- Chances ajustadas automaticamente
- Fácil gerenciar via `eventConfig.ts`

## Como Rodar Localmente

### Pré-requisitos
- Node.js 16+
- npm ou yarn

### Passos

1. **Instale as dependências:**
```bash
npm install
```

2. **Inicie o servidor de desenvolvimento:**
```bash
npm run dev
```

3. **Acesse no navegador:**
```
http://localhost:3000
```

## Como Usar

### Primeiro Acesso
1. Clique em "Criar nova conta"
2. Escolha um usuário (mínimo 3 caracteres)
3. Escolha uma senha (pode ser qualquer coisa!)
4. Clique em "Criar Conta"
5. Volte ao login e faça login com suas credenciais

### No Jogo
1. Veja seus frango atuais puxando o botão "Puxar Frango!"
2. Cada frango ganha pontos baseado na raridade
3. Você tem 100 puxadas por dia (reset às 18:00)
4. **Veja o ranking dos Top 5 jogadores**
   - Clique no botão "Ver Deck" para visualizar a coleção de cada jogador
   - Veja quantas cartas cada jugador tem
   - Filtre por raridade para analisar coleções
   - Veja gráficos de distribuição de cartas
5. Acompanhe seus últimos 5 frangos puxados

### Raridades, Pontos e Chances

| Raridade | Pontos | Chance | Rarity |
|----------|--------|--------|--------|
| 🟡 Comum | 1 | 50% | Ultra comum |
| 🔵 Incomum | 3 | 25% | Bem comum |
| 💜 Raro | 10 | 15% | Incomum |
| 🧡 Épico | 25 | 7% | Raro |
| ⭐ Lendário | 100 | 2% | Muito raro |
| 💎 Ultra-Lendária | 500 | **1%** | Extremamente raro! |

**Dica:** 1% de chance significa aproximadamente 1 Ultra-Lendária a cada 100 puxadas!

#### Visualizar Chances
Clique no botão **"📊 Chances de Drop"** dentro do jogo para ver as probabilidades com gráficos!

## Dados Salvos

Os dados são salvos no **localStorage** do navegador (no próprio browser, não em um servidor):

### Chaves de Armazenamento
- **`gachaAllUsers`** - JSON com todos os usuários cadastrados
  ```json
  {
    "usuario1": {
      "username": "usuario1",
      "password": "senha123",
      "score": 5500,
      "rollsToday": 23,
      "lastRollDate": "2025-11-03",
      "collection": [...]
    }
  }
  ```

- **`gachaCurrentUser`** - Nome do usuário logado atualmente
  ```
  "usuario1"
  ```

- **`gachaHistory_[username]`** - Últimos 5 frangos puxados por esse usuário
  ```json
  [{ cart object }, ...]
  ```

### Acessar/Limpar Dados

**Para ver os dados (F12 → Console):**
```javascript
JSON.parse(localStorage.getItem('gachaAllUsers'))
```

**Para limpar TODOS os dados:**
```javascript
localStorage.clear()
```

**Para limpar apenas um usuário:**
```javascript
let users = JSON.parse(localStorage.getItem('gachaAllUsers'))
delete users['username_aqui']
localStorage.setItem('gachaAllUsers', JSON.stringify(users))
```

⚠️ **Importante:** Dados são salvos **apenas no seu navegador**. Se limpar o cache/cookies, tudo será perdido!

## Build para Produção

```bash
npm run build
```

Saída: pasta `dist/` pronta para deploy.

## Estrutura de Arquivos

```
├── App.tsx                 # Componente principal com lógica de auth
├── types.ts               # TypeScript interfaces
├── constants.ts           # Lista de frangos e raridades
├── components/
│   ├── ChickenDisplay.tsx    # Exibe o frango puxado
│   ├── GachaButton.tsx       # Botão de puxar
│   ├── HistoryDisplay.tsx    # Histórico de puxadas
│   ├── LoadingSpinner.tsx    # Animação de carregamento
│   ├── DeckViewer.tsx        # Modal para visualizar deck dos jogadores
│   └── DropRatesDisplay.tsx  # Exibe chances de drop ✨ NOVO
├── assets/                   # Imagens dos frangos
├── index.css                 # Estilos globais
└── package.json              # Dependências
```

## Como Gerenciar Eventos

Para ativar eventos com chance aumentada, veja **[EVENTOS.md](./EVENTOS.md)**.

Exemplos rápidos:
- Aumentar Ultra-Lendária para 3%
- Criar eventos com datas de término
- Eventos em múltiplas raridades
- Desativar eventos facilmente

## Problemas Comuns

### As imagens não aparecem?
- Certifique-se que os arquivos estão em `assets/`
- Verifique se os nomes estão corretos no `constants.ts`
- Limpe o cache do navegador (Ctrl+Shift+Delete)

### A senha não funciona?
- Lembre-se: a senha é simples! Pode ser qualquer coisa
- Verifique se não tem espaços antes/depois

### Dados desapareceram?
- Verifique se o localStorage foi limpo
- Tente fazer login novamente

## Licença

Este é um projeto de brincadeira para fãs de futebol do Rio de Janeiro!
