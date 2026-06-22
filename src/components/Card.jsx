// Card component used by Board.jsx 

export default function Card({ card, faded, interactive, onClick }) {
  const isFlipped = card.flipped || card.matched;

  return (
    <button
      className={`mem-card ${card.matched ? "is-matched" : ""} ${faded ? "is-faded" : ""}`}
      onClick={() => interactive && onClick(card)}
      disabled={card.matched || !interactive}
      aria-label={isFlipped ? "Revealed card" : "Hidden card"}
    >
      <div className={`mem-card-inner ${isFlipped ? "is-flipped" : ""}`}>
        <span className="mem-card-face mem-card-front">?</span>
        <span className="mem-card-face mem-card-back">
          <img src={card.src} alt="" className="mem-card-image" />
        </span>
      </div>
    </button>
  );
}