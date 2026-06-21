import OverlayBox from "./OverlayBox";

export default function HowToPlayScreen({ onBack }) {
  return (
    <OverlayBox>
      <h2 className="title title-display">How to play</h2>
      <p className="how-to-text">
        Match cards with the matching images by clicking on a face down card
        to flip it over! You can flip a maximum of two cards at a time. If both
        flipped cards match then they are removed from the board. Otherwise,
        they flip back over. Find every pair and clear the board to win!
      </p>
      <p className="how-to-text">
        You can select three themes and difficulties before beggining a game.
        Harder difficulties have more cards.
      </p>
      <button className="secondary-button" onClick={onBack}>
        <i className="ti ti-arrow-left" aria-hidden="true"></i>
        Back
      </button>
    </OverlayBox>
  );
}
