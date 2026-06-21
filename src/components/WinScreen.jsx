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
        Play again
      </button>
      <button className="secondary-button" onClick={onQuit}>
        <i className="ti ti-home" aria-hidden="true"></i>
        Quit
      </button>
    </OverlayBox>
  );
}
