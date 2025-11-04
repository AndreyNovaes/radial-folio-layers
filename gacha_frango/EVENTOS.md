# Sistema de Eventos - Gacha de Frango

## Visão Geral

O jogo possui um **sistema de eventos dinâmico** que pode aumentar as chances de raridades específicas. Atualmente está ativo:

🎉 **Evento Especial - Festival de Frangos**
- Ultra-Lendários com **3x de chance** (1% → 3%)
- Status: ✅ **ATIVO**

## Como Alterar um Evento

### 1. Abrir o arquivo `eventConfig.ts`

Localize a seção:

```typescript
export const currentEvent: EventConfig = {
  isActive: true,
  name: '🎉 Evento Especial - Festival de Frangos',
  description: 'Ultra-Lendários aparecem 3x mais frequentes!',
  multiplier: 3,
  rarityBoost: 'ULTRA_LEGENDARY',
  endDate: '' // Indefinido
};
```

### 2. Modificar os Parâmetros

| Parâmetro | Tipo | Descrição | Exemplo |
|-----------|------|-----------|---------|
| `isActive` | boolean | Ativa/desativa o evento | `true` ou `false` |
| `name` | string | Nome do evento (aparece no jogo) | `'🎉 Festival de Frangos'` |
| `description` | string | Descrição do evento | `'Ultra-Lendários 3x mais raros!'` |
| `multiplier` | number | Multiplicador de chance | `2`, `3`, `5` |
| `rarityBoost` | string | Qual raridade é afetada | `'ULTRA_LEGENDARY'`, `'LEGENDARY'`, `'EPIC'`, `'ALL'` |
| `endDate` | string | Data de término (YYYY-MM-DD) | `'2025-12-31'` ou `''` (sem data) |

### 3. Exemplos de Eventos

#### Exemplo 1: Desativar o Evento
```typescript
export const currentEvent: EventConfig = {
  isActive: false,
  name: 'Sem Evento',
  description: '',
  multiplier: 1,
  rarityBoost: 'ULTRA_LEGENDARY',
  endDate: ''
};
```

#### Exemplo 2: Evento com Data de Término
```typescript
export const currentEvent: EventConfig = {
  isActive: true,
  name: '🎄 Natal - Frangos Épicos!',
  description: 'Épicos 2x mais frequentes até o final do mês!',
  multiplier: 2,
  rarityBoost: 'EPIC',
  endDate: '2025-12-25'
};
```

#### Exemplo 3: Evento em Tudo
```typescript
export const currentEvent: EventConfig = {
  isActive: true,
  name: '🌟 Aniversário do Jogo',
  description: 'Todas as raridades 2x mais frequentes!',
  multiplier: 2,
  rarityBoost: 'ALL',
  endDate: '2025-12-03'
};
```

#### Exemplo 4: Evento Mega de Ultra-Lendária
```typescript
export const currentEvent: EventConfig = {
  isActive: true,
  name: '💎 Mega Summon - Ultra-Lendários!',
  description: 'Ultra-Lendários com 5x de chance!',
  multiplier: 5,
  rarityBoost: 'ULTRA_LEGENDARY',
  endDate: '2025-11-10'
};
```

## Valores de `rarityBoost`

- **`'ULTRA_LEGENDARY'`** - Afeta só Ultra-Lendários
- **`'LEGENDARY'`** - Afeta só Lendários
- **`'EPIC'`** - Afeta só Épicos
- **`'ALL'`** - Afeta todas as raridades igualmente

## Chances Padrão (Sem Evento)

```
🟡 Comum:          50%
🔵 Incomum:        25%
💜 Raro:           15%
🧡 Épico:          7%
⭐ Lendário:       2%
💎 Ultra-Lendária: 1%
```

## Chances com Evento Atual (3x em Raros e Acima)

```
🟡 Comum:          0%   (removido durante evento!)
🔵 Incomum:        25%  (sem mudança)
💜 Raro:           45%  (15% x 3 = 45%)
🧡 Épico:          21%  (7% x 3 = 21%)
⭐ Lendário:       6%   (2% x 3 = 6%)
💎 Ultra-Lendária: 3%   (1% x 3 = 3%)
```

**Total = 100%** ✅

Você **NUNCA** puxará Comum durante o evento! Todos os frangos são de qualidade! 🎉

## Onde o Evento Aparece no Jogo

1. **Banner no Topo** - Quando ativo, mostra um banner pulsante com o nome do evento
2. **Seção de Drop Rates** - Mostra as chances ajustadas e destaca a raridade afetada
3. **Mensagens** - "Ultra-Lendária = 3 em cada 100 puxadas!" (durante evento)

## Depois de Alterar

### 1. Fazer Build (Opcional - para deploy)
```bash
npm run build
```

### 2. Reiniciar o Dev Server
```bash
npm run dev
```

### 3. Recarregar o Navegador
```
F5 ou Ctrl+R
```

## Verificar se Está Funcionando

1. Abra o DevTools (F12)
2. Console → Execute:
```javascript
import { currentEvent, isEventActive } from './eventConfig'
console.log(currentEvent)
console.log(isEventActive())
```

## Dicas

- **Data de término vazia** (`endDate: ''`) = Evento infinito
- Use **emojis** no nome para deixar mais atrativo: 🎉, 💎, 🌟, 🎄
- Multiplicadores maiores = Mais atrativo para os jogadores
- Eventos com data de término criam senso de urgência

## Histórico de Eventos

Você pode manter um histórico de eventos anteriores:

```typescript
export const eventHistory: EventConfig[] = [
  {
    isActive: false,
    name: 'Lançamento',
    description: 'Primeira semana - 2x tudo',
    multiplier: 2,
    rarityBoost: 'ALL',
    endDate: '2025-11-02'
  },
  // ... mais eventos anteriores
];
```

---

**Aproveite e crie eventos incríveis!** 🍗✨
