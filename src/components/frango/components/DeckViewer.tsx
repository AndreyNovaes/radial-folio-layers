import { ChickenType, Rarity } from "../types";
import { RARITY_SCORES } from "../constants";

interface DeckViewerProps {
  collection: ChickenType[];
}

export function DeckViewer({ collection }: DeckViewerProps) {
  const groupedByRarity = collection.reduce(
    (acc, chicken) => {
      if (!acc[chicken.rarity]) {
        acc[chicken.rarity] = [];
      }
      acc[chicken.rarity].push(chicken);
      return acc;
    },
    {} as Record<Rarity, ChickenType[]>
  );

  const totalPoints = collection.reduce((sum, chicken) => {
    return sum + RARITY_SCORES[chicken.rarity].points;
  }, 0);

  return (
    <div className="frango-game-wrapper__deck-viewer">
      <div className="frango-game-wrapper__deck-header">
        <h3>Seu Deck ({collection.length} frangos)</h3>
        <div className="frango-game-wrapper__total-points">
          Total: {totalPoints} pontos
        </div>
      </div>

      {collection.length === 0 ? (
        <p className="frango-game-wrapper__empty-deck">Nenhum frango no seu deck ainda</p>
      ) : (
        <div className="frango-game-wrapper__rarity-groups">
          {Object.values(Rarity).map((rarity) => {
            const chickens = groupedByRarity[rarity] || [];
            if (chickens.length === 0) return null;

            const rarityScore = RARITY_SCORES[rarity];

            return (
              <div key={rarity} className="frango-game-wrapper__rarity-group">
                <h4
                  className="frango-game-wrapper__rarity-title"
                  style={{ color: `hsl(${rarityScore.color})` }}
                >
                  {rarity.toUpperCase()} ({chickens.length})
                </h4>
                <div className="frango-game-wrapper__chickens-grid">
                  {chickens.map((chicken) => (
                    <div
                      key={chicken.id}
                      className="frango-game-wrapper__deck-chicken"
                      style={{
                        borderColor: `hsl(${rarityScore.color})`,
                      }}
                    >
                      <img
                        src={chicken.imagePath}
                        alt={chicken.name}
                        title={chicken.name}
                      />
                      <p className="frango-game-wrapper__chicken-team">
                        {chicken.team}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
