import { useState, useEffect, useRef } from "react";
import Board from "./components/Board";
import TitleScreen from "./components/TitleScreen";
import HowToPlayScreen from "./components/HowToPlayScreen";
import SetupScreen from "./components/SetupScreen";
import PauseScreen from "./components/PauseScreen";
import WinScreen from "./components/WinScreen";
import { LEVELS } from "./data/levels";
import { buildDeck, formatTime } from "./utils/gameLogic";

const STATUS_DEFAULT = "Click on a ? card to reveal what it is";
const STATUS_MATCH = "You found a match!";
const STATUS_MISMATCH = "The selected cards don't match";

export default function App() {
  const [phase, setPhase] = useState("title");
  const [level, setLevel] = useState("easy");
  const [theme, setTheme] = useState("mario");
  const [deck, setDeck] = useState([]);
  const [flippedIds, setFlippedIds] = useState([]);
  const [fadedIds, setFadedIds] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [moves, setMoves] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [locked, setLocked] = useState(false);
  const [result, setResult] = useState(null);
  const [statusText, setStatusText] = useState(STATUS_DEFAULT);
  const [gameId, setGameId] = useState(0);
  const timerRef = useRef(null);

  const columns = LEVELS[level].cols;
  const rows = LEVELS[level].rows;
  const totalPairs = LEVELS[level].pairs;
  const boardVisible = phase === "playing" || phase === "paused" || phase === "won";
  const boardBlurred = phase === "paused" || phase === "won";

  // Timer only runs while actively playing
  useEffect(() => {
    if (phase === "playing") {
      timerRef.current = setInterval(() => setSeconds((s) => s + 1), 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [phase]);

  // The blur effect is weaker if the user is on the game board screen
  useEffect(() => {
    document.body.classList.toggle("is-game", boardVisible);
  }, [boardVisible]);

  function startGame() {
    setDeck(buildDeck(level, theme));
    setFlippedIds([]);
    setFadedIds([]);
    setMatchedPairs(0);
    setMoves(0);
    setSeconds(0);
    setLocked(false);
    setStatusText(STATUS_DEFAULT);
    setGameId((id) => id + 1);
    setPhase("playing");
  }

  function handleCardClick(card) {
    if (locked || card.flipped || card.matched || flippedIds.length === 2) return;

    const nextDeck = deck.map((c) => (c.id === card.id ? { ...c, flipped: true } : c));
    const nextFlipped = [...flippedIds, card.id];
    setDeck(nextDeck);
    setFlippedIds(nextFlipped);
    setMoves((m) => m + 1); // every flip is counted as a move

    if (nextFlipped.length !== 2) return;

    setLocked(true);
    const [firstId, secondId] = nextFlipped;
    const first = nextDeck.find((c) => c.id === firstId);
    const second = nextDeck.find((c) => c.id === secondId);

    if (first.src === second.src) {
      setStatusText(STATUS_MATCH);
      handleMatch(firstId, secondId);
    } else {
      setStatusText(STATUS_MISMATCH);
      handleMismatch(firstId, secondId);
    }
  }

  function handleMatch(firstId, secondId) {
    // Greenish blue flash animation around the selected cards if they are a pair
    setTimeout(() => {
      setDeck((d) => d.map((c) => (c.id === firstId || c.id === secondId ? { ...c, matched: true } : c)));
      setFlippedIds([]);
      setLocked(false);
      setStatusText(STATUS_DEFAULT);

      setMatchedPairs((prevCount) => {
        const nextCount = prevCount + 1;
        if (nextCount === totalPairs) {
          clearInterval(timerRef.current);
          const finalResult = { moves: moves + 1, seconds };
          setResult(finalResult);
          setPhase("won");
        }
        return nextCount;
      });

      setTimeout(() => {
        setFadedIds((prev) => [...prev, firstId, secondId]);
      }, 550);
    }, 450);
  }

  function handleMismatch(firstId, secondId) {
    // Mismatched cards stay face-up for a bit before flipping back over
    // The user can't flip any other cards during this period
    setTimeout(() => {
      setDeck((d) =>
        d.map((c) => (c.id === firstId || c.id === secondId ? { ...c, flipped: false } : c))
      );
      setFlippedIds([]);
      setLocked(false);
      setStatusText(STATUS_DEFAULT);
    }, 1000);
  }

  return (
    <div className="app">
      {boardVisible && (
        <>
          <div className="stats-bar">
            <span>Time: {formatTime(seconds)}</span>
            <span>Moves: {moves}</span>
            <span>
              Found: {matchedPairs}/{totalPairs}
            </span>
            {phase === "playing" && (
              <button className="pause-button" onClick={() => setPhase("paused")}>
                <i className="ti ti-player-pause" aria-hidden="true"></i>
                Pause
              </button>
            )}
          </div>

          <div className={`board ${boardBlurred ? "is-blurred" : ""}`}>
            <Board
              key={gameId}
              deck={deck}
              columns={columns}
              rows={rows} 
              fadedIds={fadedIds}
              onCardClick={handleCardClick}
              interactive={phase === "playing"}
            />
          </div>

          <p className="status-text">{statusText}</p>
        </>
      )}

      {phase === "title" && (
        <TitleScreen onPlay={() => setPhase("setup")} onHowToPlay={() => setPhase("howtoplay")} />
      )}

      {phase === "howtoplay" && <HowToPlayScreen onBack={() => setPhase("title")} />}

      {phase === "setup" && (
        <SetupScreen
          level={level}
          setLevel={setLevel}
          theme={theme}
          setTheme={setTheme}
          onStart={startGame}
          onBack={() => setPhase("title")}
        />
      )}

      {phase === "paused" && (
        <PauseScreen
          seconds={seconds}
          moves={moves}
          matchedPairs={matchedPairs}
          totalPairs={totalPairs}
          onResume={() => setPhase("playing")}
          onRestart={startGame}
          onQuit={() => setPhase("title")}
        />
      )}

      {phase === "won" && result && (
        <WinScreen result={result} onPlayAgain={startGame} onQuit={() => setPhase("title")} />
      )}
    </div>
  );
}