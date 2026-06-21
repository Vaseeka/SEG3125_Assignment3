import OverlayBox from "./OverlayBox";
import { formatTime } from "../utils/gameLogic";

export default function WinScreen({ result, onPlayAgain, onQuit }) {
  return (
    <OverlayBox>
      <h2 className="title title-display">You win!</h2>
      <div className="result-stats">
        <div className="stat-chip">
          <p className="stat-label">Time</p>
          <p className="stat-value">{formatTime(result.seconds)}</p>
        </div>
        <div className="stat-chip">
          <p className="stat-label">Moves</p>
          <p className="stat-value">{result.moves}</p>
        </div>
      </div>
      <button className="primary-button" onClick={onPlayAgain}>
        <i className="ti ti-player-play" aria-hidden="true"></i>
        Play Again
      </button>
      <button className="secondary-button secondary-button--compact" onClick={onQuit}>
        <i className="ti ti-home" aria-hidden="true"></i>
        Return to Title Screen
      </button>
    </OverlayBox>
  );
}