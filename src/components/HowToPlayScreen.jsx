import OverlayBox from "./OverlayBox";

export default function HowToPlayScreen({ onBack }) {
  return (
    <OverlayBox>
      <h2 className="title title-display">How to play</h2>
      <p className="how-to-text">
        Memory Match is a memory matching game. Cards are placed face-down in a
        grid. Flip two cards at a time to look for a matching pair — if they
        match, they're cleared from the board. If they don't, they flip back
        over and you try again. Clear every pair to win.
      </p>
      <p className="how-to-text">
        Choose a game (Mario, Kirby, or Pokemon) and a difficulty before you
        start — harder difficulties have more cards to match.
      </p>
      <button className="secondary-button" onClick={onBack}>
        <i className="ti ti-arrow-left" aria-hidden="true"></i>
        Back
      </button>
    </OverlayBox>
  );
}
