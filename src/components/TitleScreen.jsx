import OverlayBox from "./OverlayBox";

export default function TitleScreen({ onPlay, onHowToPlay }) {
  return (
    <OverlayBox>
      <h1 className="title title-display">Memory Match</h1>

      <button className="primary-button" onClick={onPlay}>
        <i className="ti ti-player-play" aria-hidden="true"></i>
        Play
      </button>
      <button className="secondary-button secondary-button--compact" onClick={onHowToPlay}>
        How to Play
      </button>
    </OverlayBox>
  );
}