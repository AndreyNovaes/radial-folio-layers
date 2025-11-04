import React, { useState, useCallback, useEffect } from 'react';
import { ChickenType, Rarity, UserData, LeaderboardPlayer } from './types';
import { CHICKEN_TYPES, RARITY_SCORES } from './constants';
import ChickenDisplay from './components/ChickenDisplay';
import GachaButton from './components/GachaButton';
import HistoryDisplay from './components/HistoryDisplay';
import DeckViewer from './components/DeckViewer';
import DropRatesDisplay from './components/DropRatesDisplay';
import { currentEvent, isEventActive } from './eventConfig';

const App: React.FC = () => {
  // App State
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [gachaResult, setGachaResult] = useState<ChickenType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [authMessage, setAuthMessage] = useState<string | null>(null);

  // Authentication State
  const [isLoginMode, setIsLoginMode] = useState<boolean>(true);
  const [usernameInput, setUsernameInput] = useState<string>('');
  const [passwordInput, setPasswordInput] = useState<string>('');

  // User and Game State
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [rollsLeft, setRollsLeft] = useState<number>(100);
  const [score, setScore] = useState<number>(0);
  const [history, setHistory] = useState<ChickenType[]>([]);
  const [collection, setCollection] = useState<ChickenType[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderboardPlayer[]>([]);

  // Deck Viewer State
  const [deckViewerOpen, setDeckViewerOpen] = useState<boolean>(false);
  const [selectedPlayer, setSelectedPlayer] = useState<{ name: string; collection: ChickenType[]; score: number } | null>(null);

  // LocalStorage Helpers
  const getUsersData = (): Record<string, UserData> => {
    try {
      const data = localStorage.getItem('gachaAllUsers');
      return data ? JSON.parse(data) : {};
    } catch {
      return {};
    }
  };

  const saveUsersData = (users: Record<string, UserData>) => {
    localStorage.setItem('gachaAllUsers', JSON.stringify(users));
  };

  const getCurrentGachaDayString = () => {
    const now = new Date();
    const resetHour = 18;

    if (now.getHours() < resetHour) {
      const previousDay = new Date(now);
      previousDay.setDate(now.getDate() - 1);
      return previousDay.toISOString().split('T')[0];
    }

    return now.toISOString().split('T')[0];
  };

  const updateLeaderboard = useCallback(() => {
    const usersData = getUsersData();
    const players = Object.entries(usersData)
      .map(([username, data]) => ({ username, score: data.score, collection: data.collection || [] }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);
    setLeaderboard(players);
  }, []);

  const openDeckViewer = (player: LeaderboardPlayer & { collection?: ChickenType[] }) => {
    const usersData = getUsersData();
    const playerData = usersData[player.username];
    setSelectedPlayer({
      name: player.username,
      collection: playerData?.collection || [],
      score: player.score
    });
    setDeckViewerOpen(true);
  };

  // Initialize on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('gachaCurrentUser');
    if (savedUser) {
      handleLogin(savedUser, true);
    }
    updateLeaderboard();
  }, []);

  // Authentication handlers
  const handleRegister = () => {
    const username = usernameInput.trim();
    const password = passwordInput.trim();

    if (!username || !password) {
      setAuthMessage('❌ Preencha usuário e senha!');
      return;
    }

    if (username.length < 3) {
      setAuthMessage('❌ Usuário deve ter pelo menos 3 caracteres!');
      return;
    }

    const allUsers = getUsersData();

    if (allUsers[username]) {
      setAuthMessage('❌ Este usuário já existe!');
      return;
    }

    const currentGachaDay = getCurrentGachaDayString();
    const newUser: UserData = {
      username,
      password,
      rollsToday: 100,
      lastRollDate: currentGachaDay,
      score: 0,
      collection: []
    };

    allUsers[username] = newUser;
    saveUsersData(allUsers);

    setAuthMessage('✅ Conta criada! Faça login agora.');
    setIsLoginMode(true);
    setUsernameInput('');
    setPasswordInput('');
    setTimeout(() => setAuthMessage(null), 3000);
  };

  const handleLogin = (username?: string, isAutoLogin = false) => {
    const finalUsername = (username || usernameInput).trim();
    const password = passwordInput.trim();

    if (!finalUsername) {
      setAuthMessage('❌ Digite seu usuário!');
      return;
    }

    const allUsers = getUsersData();
    const user = allUsers[finalUsername];

    if (!user) {
      setAuthMessage('❌ Usuário não encontrado!');
      return;
    }

    if (!isAutoLogin && user.password !== password) {
      setAuthMessage('❌ Senha incorreta!');
      return;
    }

    const currentGachaDay = getCurrentGachaDayString();

    if (user.lastRollDate !== currentGachaDay) {
      user.rollsToday = 100;
      user.lastRollDate = currentGachaDay;
      allUsers[finalUsername] = user;
      saveUsersData(allUsers);
    }

    setCurrentUser(finalUsername);
    setScore(user.score);
    setRollsLeft(user.rollsToday);
    setCollection(user.collection || []);
    localStorage.setItem('gachaCurrentUser', finalUsername);
    setUsernameInput('');
    setPasswordInput('');
    setAuthMessage(null);

    const savedHistory = localStorage.getItem(`gachaHistory_${finalUsername}`);
    setHistory(savedHistory ? JSON.parse(savedHistory) : []);
    updateLeaderboard();
  };

  const handleLogout = () => {
    localStorage.removeItem('gachaCurrentUser');
    setCurrentUser(null);
    setUsernameInput('');
    setPasswordInput('');
    setGachaResult(null);
    setHistory([]);
    setCollection([]);
    setIsLoginMode(true);
    setAuthMessage(null);
  };

  const determineChicken = useCallback((): ChickenType => {
    const rand = Math.random() * 100;
    const eventActive = isEventActive();

    // Probabilidades base:
    // Ultra-Lendária: 1%
    // Lendária: 2%
    // Épico: 7%
    // Raro: 15%
    // Incomum: 25%
    // Comum: 50%

    let ultraLegendaryChance = 1;
    let legendaryChance = 2;
    let epicChance = 7;
    let rareChance = 15;
    let uncommonChance = 25;

    // Aplicar multiplicador do evento
    if (eventActive) {
      const mult = currentEvent.multiplier;
      if (currentEvent.rarityBoost === 'ALL') {
        // Multiplicar todos menos Comum
        ultraLegendaryChance = 1 * mult;
        legendaryChance = 2 * mult;
        epicChance = 7 * mult;
        rareChance = 15 * mult;
      } else if (currentEvent.rarityBoost === 'ULTRA_LEGENDARY') {
        ultraLegendaryChance = 1 * mult;
      } else if (currentEvent.rarityBoost === 'LEGENDARY') {
        legendaryChance = 2 * mult;
      } else if (currentEvent.rarityBoost === 'EPIC') {
        epicChance = 7 * mult;
      }
    }

    // Ajustar Comum para que total = 100%
    const rare_and_above = ultraLegendaryChance + legendaryChance + epicChance + rareChance;
    let commonChance = 100 - (rare_and_above + uncommonChance);
    if (commonChance < 0) commonChance = 0;

    const cumulative = {
      ultraLegendary: ultraLegendaryChance,
      legendary: ultraLegendaryChance + legendaryChance,
      epic: ultraLegendaryChance + legendaryChance + epicChance,
      rare: ultraLegendaryChance + legendaryChance + epicChance + rareChance,
      uncommon: ultraLegendaryChance + legendaryChance + epicChance + rareChance + uncommonChance,
      common: ultraLegendaryChance + legendaryChance + epicChance + rareChance + uncommonChance + commonChance
    };

    let chosenRarity: Rarity;
    if (rand < cumulative.ultraLegendary) {
      chosenRarity = Rarity.ULTRA_LEGENDARY;
    } else if (rand < cumulative.legendary) {
      chosenRarity = Rarity.LEGENDARY;
    } else if (rand < cumulative.epic) {
      chosenRarity = Rarity.EPIC;
    } else if (rand < cumulative.rare) {
      chosenRarity = Rarity.RARE;
    } else if (rand < cumulative.uncommon) {
      chosenRarity = Rarity.UNCOMMON;
    } else {
      chosenRarity = Rarity.COMMON;
    }

    const possibleChickens = CHICKEN_TYPES.filter(c => c.rarity === chosenRarity);

    if (possibleChickens.length === 0) {
      const commonChickens = CHICKEN_TYPES.filter(c => c.rarity === Rarity.COMMON);
      return commonChickens[Math.floor(Math.random() * commonChickens.length)];
    }

    return possibleChickens[Math.floor(Math.random() * possibleChickens.length)];
  }, []);

  const handleRoll = useCallback(async () => {
    if (rollsLeft <= 0 || !currentUser) return;

    setIsLoading(true);
    setError(null);
    setGachaResult(null);

    await new Promise(resolve => setTimeout(resolve, 1500));

    try {
      const result = determineChicken();
      const points = RARITY_SCORES[result.rarity];

      const newRollsLeft = rollsLeft - 1;
      const newScore = score + points;
      const newHistory = [result, ...history].slice(0, 5);
      const newCollection = [...collection, result];

      setGachaResult(result);
      setRollsLeft(newRollsLeft);
      setScore(newScore);
      setHistory(newHistory);
      setCollection(newCollection);

      const allUsers = getUsersData();
      if (allUsers[currentUser]) {
        allUsers[currentUser].rollsToday = newRollsLeft;
        allUsers[currentUser].score = newScore;
        allUsers[currentUser].lastRollDate = getCurrentGachaDayString();
        allUsers[currentUser].collection = newCollection;
        saveUsersData(allUsers);
        localStorage.setItem(`gachaHistory_${currentUser}`, JSON.stringify(newHistory));
      }

      updateLeaderboard();

    } catch (e) {
      setError('Ocorreu um erro ao invocar o frango. Tente novamente.');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, [currentUser, rollsLeft, score, history, collection, determineChicken, updateLeaderboard]);

  // Login Screen
  const LoginScreen = (
    <div className="w-full max-w-sm">
      <h1 className="text-4xl font-bold text-center text-purple-200 mb-2">Gacha de Frango</h1>
      <p className="text-center text-purple-300 mb-8">Edição Batalha do Rio</p>
      <div className="bg-gray-800 p-8 rounded-2xl shadow-lg border border-purple-500/30">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          {isLoginMode ? 'Login' : 'Criar Conta'}
        </h2>

        <input
          type="text"
          value={usernameInput}
          onChange={(e) => setUsernameInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && (isLoginMode ? handleLogin() : handleRegister())}
          placeholder="Nome de usuário"
          className="w-full px-4 py-3 mb-3 bg-gray-900 text-white border-2 border-purple-500/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
        />

        <input
          type="password"
          value={passwordInput}
          onChange={(e) => setPasswordInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && (isLoginMode ? handleLogin() : handleRegister())}
          placeholder="Senha"
          className="w-full px-4 py-3 mb-4 bg-gray-900 text-white border-2 border-purple-500/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
        />

        {authMessage && (
          <p className="text-center text-sm mb-4 font-semibold">
            {authMessage}
          </p>
        )}

        <button
          onClick={isLoginMode ? () => handleLogin() : handleRegister}
          className="w-full px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-transform transform hover:scale-105"
        >
          {isLoginMode ? 'Entrar' : 'Criar Conta'}
        </button>

        <button
          onClick={() => {
            setIsLoginMode(!isLoginMode);
            setUsernameInput('');
            setPasswordInput('');
            setAuthMessage(null);
          }}
          className="w-full mt-3 px-8 py-2 bg-gray-700 text-purple-300 font-semibold rounded-lg hover:bg-gray-600 transition-colors text-sm"
        >
          {isLoginMode ? 'Criar nova conta' : 'Voltar ao login'}
        </button>
      </div>
    </div>
  );

  // Game Screen
  const GameScreen = (
    <>
      {isEventActive() && (
        <div className="w-full max-w-md mb-4 p-3 bg-gradient-to-r from-fuchsia-600 to-pink-600 rounded-lg border-2 border-fuchsia-300 animate-pulse">
          <p className="text-white font-bold text-center text-sm">🎉 {currentEvent.name}</p>
          <p className="text-white text-center text-xs mt-1">💎 Ultra-Lendária com 3x de chance! 💎</p>
        </div>
      )}

      <header className="w-full max-w-md flex justify-between items-center mb-6">
        <div>
          <p className="text-purple-300">Bem-vindo, <span className="font-bold text-white">{currentUser}</span></p>
          <p className="text-purple-300">Pontuação: <span className="font-bold text-white">{score}</span></p>
          <p className="text-purple-300 text-sm">Coleção: <span className="font-bold text-white">{collection.length}</span> cartas</p>
        </div>
        <button onClick={handleLogout} className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors">
          Sair
        </button>
      </header>

      <ChickenDisplay chicken={gachaResult} isLoading={isLoading} />

      {error && <p className="text-red-400 mt-4 text-center">{error}</p>}

      <GachaButton onClick={handleRoll} isLoading={isLoading} rollsLeft={rollsLeft} />

      <DropRatesDisplay />

      <div className="w-full max-w-md mt-8">
        <h3 className="text-2xl font-bold text-purple-300 mb-4 text-center">🏆 Ranking Top 5 🏆</h3>
        <div className="space-y-2 bg-gray-800/50 p-4 rounded-lg border border-purple-500/30">
          {leaderboard.length > 0 ? leaderboard.map((player, index) => (
            <div key={player.username} className="flex justify-between items-center text-white p-3 rounded bg-gray-900/50 hover:bg-gray-900 transition-colors">
              <div className="flex-1">
                <span className="font-semibold">{index + 1}. {player.username}</span>
                <p className="text-purple-300 text-xs mt-1">{player.collection?.length || 0} cartas</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold">{player.score} pontos</span>
                <button
                  onClick={() => openDeckViewer(player as LeaderboardPlayer & { collection?: ChickenType[] })}
                  className="ml-2 px-3 py-1 bg-purple-600 text-white text-sm font-semibold rounded hover:bg-purple-700 transition-colors"
                >
                  Ver Deck
                </button>
              </div>
            </div>
          )) : <p className="text-center text-purple-400">O ranking está vazio. Seja o primeiro!</p>}
        </div>
      </div>

      <HistoryDisplay history={history} />

      <footer className="w-full max-w-md text-center mt-12 text-purple-400 text-sm">
        <p>As puxadas são reiniciadas todos os dias às 18:00.</p>
      </footer>
    </>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4 font-sans">
      <div className="w-full max-w-md flex flex-col items-center">
        {currentUser ? GameScreen : LoginScreen}
      </div>

      {selectedPlayer && (
        <DeckViewer
          isOpen={deckViewerOpen}
          onClose={() => {
            setDeckViewerOpen(false);
            setSelectedPlayer(null);
          }}
          playerName={selectedPlayer.name}
          playerCollection={selectedPlayer.collection}
          playerScore={selectedPlayer.score}
        />
      )}
    </div>
  );
};

export default App;
