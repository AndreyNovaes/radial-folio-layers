import { EventConfig } from "./types";

export const EVENTS: EventConfig[] = [
  {
    name: "Festival de Frangos",
    startDate: new Date("2024-01-01").getTime(),
    endDate: new Date("2025-12-31").getTime(),
    multiplier: 3,
    description: "3x multiplier on all drops! Celebrate the chicken festival!",
  },
];

export function isEventActive(event: EventConfig): boolean {
  const now = Date.now();
  return now >= event.startDate && now <= event.endDate;
}

export function getActiveEventMultiplier(): number {
  const activeEvent = EVENTS.find(isEventActive);
  return activeEvent ? activeEvent.multiplier : 1;
}
