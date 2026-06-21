import OverlayBox from "./OverlayBox";
import { LEVELS } from "../data/levels";
import { THEMES } from "../data/themes";

export default function SetupScreen({ level, setLevel, theme, setTheme, onStart, onBack }) {
  return (
    <OverlayBox>
      <h2 className="title title-display">Setup</h2>

      <div className="field-group">
        <p className="field-label">Game</p>
        <div className="option-row">
          {Object.entries(THEMES).map(([key, val]) => (
            <button
              key={key}
              className={`option-pill ${theme === key ? "selected" : ""}`}
              onClick={() => setTheme(key)}
            >
              <img src={val.iconSrc} alt="" className="pill-icon" />
              <span>{val.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="field-group">
        <p className="field-label">Difficulty</p>
        <div className="option-row">
          {Object.entries(LEVELS).map(([key, val]) => (
            <button
              key={key}
              className={`option-pill ${level === key ? "selected" : ""}`}
              onClick={() => setLevel(key)}
            >
              <span className="star-row" aria-hidden="true">
                {Array.from({ length: 3 }, (_, i) => (
                  <i
                    key={i}
                    className="ti ti-star"
                    style={{ opacity: i < val.stars ? 1 : 0.3 }}
                  ></i>
                ))}
              </span>
              <span>{val.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="button-row">
        <button className="secondary-button" onClick={onBack}>
          <i className="ti ti-arrow-left" aria-hidden="true"></i>
          Back
        </button>
        <button className="secondary-button" onClick={onStart}>
          <i className="ti ti-player-play" aria-hidden="true"></i>
          Start
        </button>
      </div>
    </OverlayBox>
  );
}
