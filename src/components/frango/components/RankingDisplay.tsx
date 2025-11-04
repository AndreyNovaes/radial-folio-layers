import { UserProfile } from "../services/rankingService";

interface RankingDisplayProps {
  users: UserProfile[];
  currentUserId?: string;
}

export function RankingDisplay({ users, currentUserId }: RankingDisplayProps) {
  if (users.length === 0) {
    return (
      <div className="frango-game-wrapper__ranking-display">
        <h3>Top Rankings</h3>
        <p className="frango-game-wrapper__empty-ranking">Nenhum jogador registrado ainda</p>
      </div>
    );
  }

  return (
    <div className="frango-game-wrapper__ranking-display">
      <h3>🏆 Top 10 Jogadores</h3>
      <div className="frango-game-wrapper__ranking-list">
        {users.map((user, index) => {
          const isCurrentUser = currentUserId === user.id;
          const uniqueChickens = new Set(user.collection).size;

          return (
            <div
              key={user.id}
              className={`frango-game-wrapper__ranking-item ${
                isCurrentUser ? "frango-game-wrapper__ranking-item--current" : ""
              }`}
            >
              <div className="frango-game-wrapper__ranking-position">
                {index === 0 && "🥇"}
                {index === 1 && "🥈"}
                {index === 2 && "🥉"}
                {index >= 3 && `#${index + 1}`}
              </div>

              <div className="frango-game-wrapper__ranking-user-info">
                <h4 className="frango-game-wrapper__ranking-username">
                  {user.username}
                  {isCurrentUser && " (Você)"}
                </h4>
                <p className="frango-game-wrapper__ranking-stats">
                  {user.totalRolls} pulls • {uniqueChickens} frangos únicos
                </p>
              </div>

              <div className="frango-game-wrapper__ranking-score">
                <div className="frango-game-wrapper__ranking-pulls">
                  {user.totalRolls}/100
                </div>
                <div className="frango-game-wrapper__ranking-progress">
                  <div
                    className="frango-game-wrapper__ranking-progress-bar"
                    style={{
                      width: `${(user.totalRolls / 100) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
