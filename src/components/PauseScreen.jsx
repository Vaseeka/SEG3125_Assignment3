import OverlayBox from "./OverlayBox";
import { formatTime } from "../utils/gameLogic";

export default function PauseScreen({ seconds, moves, matchedPairs, totalPairs, onResume, onRestart, onQuit }) {
  return (
    <OverlayBox>
      <h2 className="title title-display">Paused</h2>

      <div className="result-stats mb-3">
        <div className="stat-chip">
          <p className="stat-label">Time</p>
          <p className="stat-value">{formatTime(seconds)}</p>
        </div>
        <div className="stat-chip">
          <p className="stat-label">Moves</p>
          <p className="stat-value">{moves}</p>
        </div>
        <div className="stat-chip">
          <p className="stat-label">Found</p>
          <p className="stat-value">
            {matchedPairs}/{totalPairs}
          </p>
        </div>
      </div>

      <button className="secondary-button" onClick={onResume}>
        <i className="ti ti-player-play" aria-hidden="true"></i>
        Resume
      </button>
      <button className="secondary-button" onClick={onRestart}>
        <i className="ti ti-refresh" aria-hidden="true"></i>
        Restart
      </button>
      <button className="secondary-button" onClick={onQuit}>
        <i className="ti ti-home" aria-hidden="true"></i>
        Return to Title Screen
      </button>
    </OverlayBox>
  );
}
