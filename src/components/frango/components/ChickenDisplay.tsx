import { ChickenType } from "../types";
import { RARITY_SCORES } from "../constants";

interface ChickenDisplayProps {
  chicken: ChickenType | null;
  isAnimating?: boolean;
}

export function ChickenDisplay({ chicken, isAnimating = false }: ChickenDisplayProps) {
  if (!chicken) {
    return (
      <div className="frango-game-wrapper__chicken-display">
        <div className="frango-game-wrapper__empty-state">
          <p>🐔 Puxe um frango para começar!</p>
        </div>
      </div>
    );
  }

  const rarityScore = RARITY_SCORES[chicken.rarity];

  return (
    <div className="frango-game-wrapper__chicken-display">
      <div
        className={`frango-game-wrapper__chicken-card ${isAnimating ? "frango-game-wrapper__chicken-card--animating" : ""}`}
        style={{
          borderColor: `hsl(${chicken.borderColor})`,
          boxShadow: `0 0 20px hsl(${chicken.glowColor}), inset 0 0 20px hsl(${chicken.glowColor})`,
        }}
      >
        <div
          className="frango-game-wrapper__rarity-badge"
          style={{
            backgroundColor: `hsl(${rarityScore.color})`,
            color: "#fff",
          }}
        >
          {chicken.rarity.toUpperCase()}
        </div>

        <img
          src={chicken.imagePath}
          alt={chicken.name}
          className="frango-game-wrapper__chicken-image"
          onError={(e) => {
            const img = e.target as HTMLImageElement;
            img.style.display = "none";
            const parent = img.parentElement;
            if (parent) {
              const fallback = document.createElement("div");
              fallback.className = "frango-game-wrapper__image-fallback";
              fallback.textContent = "🐔";
              parent.appendChild(fallback);
            }
          }}
        />

        <div className="frango-game-wrapper__chicken-info">
          <h3>{chicken.name}</h3>
          <p className="frango-game-wrapper__team-name">{chicken.team}</p>
          <p className="frango-game-wrapper__points">
            {rarityScore.points} pontos
          </p>
        </div>
      </div>
    </div>
  );
}
