import { ChickenType } from "../types";
import { RARITY_SCORES } from "../constants";

interface HistoryDisplayProps {
  history: ChickenType[];
  onClear?: () => void;
}

export function HistoryDisplay({ history, onClear }: HistoryDisplayProps) {
  if (history.length === 0) {
    return (
      <div className="frango-game-wrapper__history-display">
        <h3>Histórico de Pulls</h3>
        <p className="frango-game-wrapper__empty-history">Nenhum pull ainda</p>
      </div>
    );
  }

  return (
    <div className="frango-game-wrapper__history-display">
      <div className="frango-game-wrapper__history-header">
        <h3>Últimos Pulls ({history.length})</h3>
        {onClear && (
          <button
            onClick={onClear}
            className="frango-game-wrapper__clear-button"
          >
            Limpar
          </button>
        )}
      </div>

      <div className="frango-game-wrapper__history-list">
        {history.map((chicken, index) => {
          const rarityScore = RARITY_SCORES[chicken.rarity];
          return (
            <div
              key={index}
              className="frango-game-wrapper__history-item"
              style={{
                borderLeftColor: `hsl(${rarityScore.color})`,
              }}
            >
              <img
                src={chicken.imagePath}
                alt={chicken.name}
                className="frango-game-wrapper__history-image"
              />
              <div className="frango-game-wrapper__history-info">
                <p className="frango-game-wrapper__history-name">
                  {chicken.name}
                </p>
                <p className="frango-game-wrapper__history-rarity"
                  style={{ color: `hsl(${rarityScore.color})` }}
                >
                  {chicken.rarity.toUpperCase()}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
