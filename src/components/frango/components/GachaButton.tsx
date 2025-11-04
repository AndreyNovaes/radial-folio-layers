interface GachaButtonProps {
  onClick: () => void;
  disabled?: boolean;
  eventMultiplier?: number;
}

export function GachaButton({
  onClick,
  disabled = false,
  eventMultiplier = 1,
}: GachaButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="frango-game-wrapper__gacha-button"
      title={eventMultiplier > 1 ? `Event active! ${eventMultiplier}x multiplier` : "Pull a chicken"}
    >
      <span className="frango-game-wrapper__gacha-text">
        🎲 Puxar Frango {eventMultiplier > 1 && `(${eventMultiplier}x)`}
      </span>
    </button>
  );
}
