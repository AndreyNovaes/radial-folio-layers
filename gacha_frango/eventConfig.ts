// Configuração de Eventos do Gacha

export interface EventConfig {
  isActive: boolean;
  name: string;
  description: string;
  multiplier: number;
  rarityBoost: 'ULTRA_LEGENDARY' | 'LEGENDARY' | 'EPIC' | 'ALL' | 'ULTRA_AND_LEGENDARY';
  endDate: string; // YYYY-MM-DD ou vazio para indefinido
}

// Evento atual - MODIFICAR AQUI PARA ALTERAR O EVENTO
export const currentEvent: EventConfig = {
  isActive: true,
  name: '🎉 Evento Especial - Festival de Frangos',
  description: 'Todos os frangos raros e acima aparecem 3x mais frequentes!',
  multiplier: 3,
  rarityBoost: 'ALL', // Afeta todas as raridades
  endDate: '' // Indefinido
};

// Histórico de eventos (para referência)
export const eventHistory: EventConfig[] = [
  {
    isActive: false,
    name: 'Evento de Lançamento',
    description: 'Tudo 2x mais raro',
    multiplier: 2,
    rarityBoost: 'ALL',
    endDate: '2025-11-02'
  }
];

export const getEventMultiplier = (rarity: string): number => {
  if (!currentEvent.isActive) return 1;

  if (currentEvent.rarityBoost === 'ALL') {
    return currentEvent.multiplier;
  }

  if (currentEvent.rarityBoost === rarity) {
    return currentEvent.multiplier;
  }

  return 1;
};

export const isEventActive = (): boolean => {
  if (!currentEvent.isActive) return false;

  if (!currentEvent.endDate) {
    return true; // Sem data de término = infinito
  }

  const endDate = new Date(currentEvent.endDate);
  const now = new Date();

  return now <= endDate;
};
