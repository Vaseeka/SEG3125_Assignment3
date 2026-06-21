import OverlayBox from "./OverlayBox";

export default function TitleScreen({ onPlay, onHowToPlay }) {
  return (
    <OverlayBox>
      <h1 className="title title-display">Memory Match</h1>
      <p className="subtitle">Nintendo edition</p>

      <button className="primary-button" onClick={onPlay}>
        <i className="ti ti-player-play" aria-hidden="true"></i>
        Play
      </button>
      <button className="secondary-button" onClick={onHowToPlay}>
        How to play
      </button>
    </OverlayBox>
  );
}
