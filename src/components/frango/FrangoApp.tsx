import React, { useState, useEffect } from "react";
import { ChickenType } from "./types";
import { CHICKEN_TYPES, getRandomChicken } from "./constants";
import { getActiveEventMultiplier } from "./eventConfig";
import { UserProfile } from "./services/rankingService";
import {
  createOrGetUser,
  getUser,
  addPull,
  getRanking,
} from "./services/apiService";
import { LoadingSpinner } from "./components/LoadingSpinner";
import { GachaButton } from "./components/GachaButton";
import { ChickenDisplay } from "./components/ChickenDisplay";
import { HistoryDisplay } from "./components/HistoryDisplay";
import { DeckViewer } from "./components/DeckViewer";
import { DropRatesDisplay } from "./components/DropRatesDisplay";
import { RankingDisplay } from "./components/RankingDisplay";
import "./styles/frango.css";

export function FrangoApp() {
  const [isLoading, setIsLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [currentChicken, setCurrentChicken] = useState<ChickenType | null>(null);
  const [pullHistory, setPullHistory] = useState<ChickenType[]>([]);
  const [collection, setCollection] = useState<ChickenType[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPulling, setIsPulling] = useState(false);
  const [activeTab, setActiveTab] = useState<"gacha" | "deck" | "rates" | "ranking">("gacha");
  const [ranking, setRanking] = useState<UserProfile[]>([]);
  const [remainingPulls, setRemainingPulls] = useState(100);

  // Initialize app
  useEffect(() => {
    const loadData = async () => {
      const savedUserId = localStorage.getItem("frangoUserId");

      if (savedUserId) {
        const savedUser = await getUser(savedUserId);
        if (savedUser) {
          setUserId(savedUser.id);
          setUser(savedUser);
          setUsername(savedUser.username);
          setIsAuthenticated(true);

          // Reconstruct deck from collection IDs
          const deck = savedUser.collection
            .map(id => CHICKEN_TYPES.find(c => c.id === id))
            .filter(Boolean) as ChickenType[];
          setCollection(deck);
          setRemainingPulls(Math.max(0, 100 - savedUser.totalRolls));
        }
      }

      // Load ranking
      const ranking = await getRanking();
      setRanking(ranking);
      setIsLoading(false);
    };

    loadData();
  }, []);

  const handleLogin = async (name: string) => {
    if (!name.trim()) return;

    try {
      const newUser = await createOrGetUser(name);
      setUserId(newUser.id);
      setUser(newUser);
      setUsername(name);
      setIsAuthenticated(true);

      // Reconstruct deck from collection IDs
      const deck = newUser.collection
        .map(id => CHICKEN_TYPES.find(c => c.id === id))
        .filter(Boolean) as ChickenType[];
      setCollection(deck);
      setRemainingPulls(Math.max(0, 100 - newUser.totalRolls));
      localStorage.setItem("frangoUserId", newUser.id);

      // Update ranking
      const ranking = await getRanking();
      setRanking(ranking);
    } catch (error) {
      console.error("Login error:", error);
      alert("Erro ao fazer login. Tente novamente.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("frangoUserId");
    setUsername("");
    setUser(null);
    setUserId(null);
    setIsAuthenticated(false);
    setCollection([]);
    setPullHistory([]);
    setCurrentChicken(null);
  };

  const handlePull = async () => {
    if (!userId || isPulling || !user || user.totalRolls >= 100) return;

    setIsPulling(true);
    setIsAnimating(true);

    // Simulate pull animation
    setTimeout(async () => {
      try {
        const chicken = getRandomChicken();
        setCurrentChicken(chicken);

        // Add to server
        const updatedUser = await addPull(userId, chicken.id);
        if (updatedUser) {
          // Update local state
          setPullHistory([chicken, ...pullHistory]);
          setUser(updatedUser);

          // Reconstruct deck from collection IDs
          const deck = updatedUser.collection
            .map(id => CHICKEN_TYPES.find(c => c.id === id))
            .filter(Boolean) as ChickenType[];
          setCollection(deck);
          setRemainingPulls(Math.max(0, 100 - updatedUser.totalRolls));

          // Update ranking
          const ranking = await getRanking();
          setRanking(ranking);
        } else {
          alert("Erro ao adicionar pull. Tente novamente.");
        }
      } catch (error) {
        console.error("Pull error:", error);
        alert("Erro ao fazer pull. Tente novamente.");
      }

      setIsAnimating(false);
      setIsPulling(false);
    }, 1500);
  };

  const handleClearHistory = () => {
    if (window.confirm("Tem certeza que quer limpar o histórico?")) {
      setPullHistory([]);
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated) {
    return (
      <div className="frango-game-wrapper">
        <div className="frango-game-wrapper__login">
          <div className="frango-game-wrapper__login-card">
            <h1>🐔 Gacha de Frango</h1>
            <p>Bem-vindo ao melhor gacha de frangos do Brasil!</p>
            <p className="frango-game-wrapper__login-subtitle">
              Máximo 100 pulls por jogador - Compete no ranking!
            </p>

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const input = e.currentTarget.querySelector("input") as HTMLInputElement;
                if (input) {
                  await handleLogin(input.value);
                  input.value = "";
                }
              }}
            >
              <input
                type="text"
                placeholder="Digite seu nome"
                className="frango-game-wrapper__login-input"
                required
              />
              <button type="submit" className="frango-game-wrapper__login-button">
                Começar
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  const eventMultiplier = getActiveEventMultiplier();
  const canPull = user && user.totalRolls < 100;

  return (
    <div className="frango-game-wrapper">
      <div className="frango-game-wrapper__container">
        {/* Header */}
        <div className="frango-game-wrapper__header">
          <div>
            <h1>🐔 Gacha de Frango</h1>
            <p className="frango-game-wrapper__user-info">
              {username} • {user?.totalRolls || 0}/100 pulls • {collection.length} frangos
              {!canPull && " • ✅ META ATINGIDA"}
            </p>
            {remainingPulls > 0 && (
              <p className="frango-game-wrapper__remaining-pulls">
                Restam: {remainingPulls} pulls
              </p>
            )}
          </div>
          <button
            className="frango-game-wrapper__logout-button"
            onClick={handleLogout}
          >
            Sair
          </button>
        </div>

        {/* Tabs */}
        <div className="frango-game-wrapper__tabs">
          <button
            className={`frango-game-wrapper__tab ${
              activeTab === "gacha" ? "frango-game-wrapper__tab--active" : ""
            }`}
            onClick={() => setActiveTab("gacha")}
          >
            Gacha
          </button>
          <button
            className={`frango-game-wrapper__tab ${
              activeTab === "deck" ? "frango-game-wrapper__tab--active" : ""
            }`}
            onClick={() => setActiveTab("deck")}
          >
            Deck ({collection.length})
          </button>
          <button
            className={`frango-game-wrapper__tab ${
              activeTab === "rates" ? "frango-game-wrapper__tab--active" : ""
            }`}
            onClick={() => setActiveTab("rates")}
          >
            Taxas
          </button>
          <button
            className={`frango-game-wrapper__tab ${
              activeTab === "ranking" ? "frango-game-wrapper__tab--active" : ""
            }`}
            onClick={() => setActiveTab("ranking")}
          >
            Ranking
          </button>
        </div>

        {/* Status Message for Max Pulls */}
        {!canPull && (
          <div className="frango-game-wrapper__max-pulls-notice">
            🎉 Parabéns! Você atingiu o máximo de 100 pulls! Confira seu posicionamento no ranking!
          </div>
        )}

        {/* Main Content */}
        <div className="frango-game-wrapper__content">
          {activeTab === "gacha" && (
            <>
              {!canPull ? (
                <div className="frango-game-wrapper__game-over">
                  <h2>Você completou sua jornada! 🏆</h2>
                  <p>Máximo de 100 pulls atingido</p>
                  <p>Veja seu posicionamento no ranking!</p>
                </div>
              ) : (
                <>
                  <div className="frango-game-wrapper__gacha-section">
                    <ChickenDisplay chicken={currentChicken} isAnimating={isAnimating} />
                    <GachaButton
                      onClick={handlePull}
                      disabled={isPulling || !canPull}
                      eventMultiplier={eventMultiplier}
                    />
                  </div>

                  <div className="frango-game-wrapper__history-section">
                    <HistoryDisplay
                      history={pullHistory.slice(0, 20)}
                      onClear={handleClearHistory}
                    />
                  </div>
                </>
              )}
            </>
          )}

          {activeTab === "deck" && <DeckViewer collection={collection} />}

          {activeTab === "rates" && <DropRatesDisplay />}

          {activeTab === "ranking" && (
            <RankingDisplay users={ranking} currentUserId={userId!} />
          )}
        </div>
      </div>
    </div>
  );
}
