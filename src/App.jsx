import { useState, useEffect, useRef } from "react";
import Board from "./components/Board";
import TitleScreen from "./components/TitleScreen";
import HowToPlayScreen from "./components/HowToPlayScreen";
import SetupScreen from "./components/SetupScreen";
import PauseScreen from "./components/PauseScreen";
import WinScreen from "./components/WinScreen";
import { LEVELS } from "./data/levels";
import { buildDeck, formatTime } from "./utils/gameLogic";

/*
  App.jsx is the orchestrator: it owns the game state and decides which
  screen to show. `phase` drives everything:

    "title" -> "howtoplay" (Back returns to title)
    "title" -> "setup" (Back returns to title)
    "setup" -> "playing" (Start)
    "playing" <-> "paused" (Pause / Resume)
    "paused" -> "title" (Quit) or back to "playing" via Restart
    "playing" -> "won" (all pairs matched)
    "won" -> "playing" (Play again, same settings) or "title" (Quit)

  WIN-CONDITION NOTE (for future me): matched pairs are tracked with a dedicated
  `matchedPairs` counter that increments exactly once per confirmed
  match, rather than being re-derived by filtering the deck array each
  time. Re-deriving the count was the source of an earlier bug where the
  game could report a win before every pair was actually matched and a
  single authoritative counter removes that ambiguity entirely.
*/

const STATUS_DEFAULT = "Click on a ? card to reveal what it is";
const STATUS_MATCH = "You found a match!";
const STATUS_MISMATCH = "The cards you selected don't match!";

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
  const timerRef = useRef(null);

  const columns = LEVELS[level].cols;
  const totalPairs = LEVELS[level].pairs;

  // Timer only runs while actively playing.
  useEffect(() => {
    if (phase === "playing") {
      timerRef.current = setInterval(() => setSeconds((s) => s + 1), 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [phase]);

  function startGame() {
    setDeck(buildDeck(level, theme));
    setFlippedIds([]);
    setFadedIds([]);
    setMatchedPairs(0);
    setMoves(0);
    setSeconds(0);
    setLocked(false);
    setStatusText(STATUS_DEFAULT);
    setPhase("playing");
  }

  function handleCardClick(card) {
    if (locked || card.flipped || card.matched || flippedIds.length === 2) return;

    const nextDeck = deck.map((c) => (c.id === card.id ? { ...c, flipped: true } : c));
    const nextFlipped = [...flippedIds, card.id];
    setDeck(nextDeck);
    setFlippedIds(nextFlipped);

    if (nextFlipped.length !== 2) return;

    setMoves((m) => m + 1);
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
    // Brief green flash (handled by .is-matched in CSS), then fade the
    // pair out after a beat so the win moment doesn't feel instant.
    setTimeout(() => {
      setDeck((d) => d.map((c) => (c.id === firstId || c.id === secondId ? { ...c, matched: true } : c)));
      setFlippedIds([]);
      setLocked(false);
      setStatusText(STATUS_DEFAULT);

      // The ONE place matched-pair progress is incremented. This is the
      // single source of truth for both the "Found X/Y" display and the
      // win check below — nothing else recomputes this count.
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
    // Mismatched cards stay face-up for 2s so the player can register
    // them before they flip back; board stays locked the whole time.
    setTimeout(() => {
      setDeck((d) =>
        d.map((c) => (c.id === firstId || c.id === secondId ? { ...c, flipped: false } : c))
      );
      setFlippedIds([]);
      setLocked(false);
      setStatusText(STATUS_DEFAULT);
    }, 2000);
  }

  const boardVisible = phase === "playing" || phase === "paused" || phase === "won";
  const boardBlurred = phase === "paused" || phase === "won";

  return (
    <div className="app">
      {boardVisible && (
        <>
          <div className="stats-bar">
            <span>Time {formatTime(seconds)}</span>
            <span>Moves {moves}</span>
            <span>
              Found {matchedPairs}/{totalPairs}
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
              deck={deck}
              columns={columns}
              fadedIds={fadedIds}
              onCardClick={handleCardClick}
              interactive={phase === "playing"}
            />
            <p className="status-text">{statusText}</p>
          </div>
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
