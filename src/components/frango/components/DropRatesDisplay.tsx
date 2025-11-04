import { RARITY_SCORES } from "../constants";
import { getActiveEventMultiplier } from "../eventConfig";

export function DropRatesDisplay() {
  const eventMultiplier = getActiveEventMultiplier();

  return (
    <div className="frango-game-wrapper__drop-rates">
      <h3>Taxas de Drop</h3>
      {eventMultiplier > 1 && (
        <div className="frango-game-wrapper__event-notice">
          🎉 Evento Ativo! Multiplicador: {eventMultiplier}x
        </div>
      )}
      <div className="frango-game-wrapper__rates-list">
        {Object.values(RARITY_SCORES).map((score) => {
          const totalWeight = Object.values(RARITY_SCORES).reduce(
            (sum, s) => sum + s.baseWeight,
            0
          );
          const percentage = ((score.baseWeight / totalWeight) * 100).toFixed(2);

          return (
            <div key={score.rarity} className="frango-game-wrapper__rate-item">
              <div
                className="frango-game-wrapper__rate-color"
                style={{
                  backgroundColor: `hsl(${score.color})`,
                }}
              ></div>
              <div className="frango-game-wrapper__rate-info">
                <span className="frango-game-wrapper__rate-name">
                  {score.rarity.toUpperCase()}
                </span>
                <span className="frango-game-wrapper__rate-percentage">
                  {percentage}%
                </span>
              </div>
              <span className="frango-game-wrapper__rate-points">
                {score.points}pts
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
