// A single memory card. Board.jsx renders one of these per card in the
// deck with .map(). It renders itself based on the props it's given
export default function Card({ card, faded, interactive, onClick }) {
  const isFlipped = card.flipped || card.matched;

  return (
    <button
      className={`card ${card.matched ? "is-matched" : ""} ${faded ? "is-faded" : ""}`}
      onClick={() => interactive && onClick(card)}
      disabled={card.matched || !interactive}
      aria-label={isFlipped ? "Revealed card" : "Hidden card"}
    >
      <div className={`card-inner ${isFlipped ? "is-flipped" : ""}`}>
        <span className="card-face card-front">?</span>
        <span className="card-face card-back">
          <img src={card.src} alt="" className="card-image" />
        </span>
      </div>
    </button>
  );
}
