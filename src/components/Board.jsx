import Card from "./Card";

// Renders the grid of cards. Maps the deck array to one <Card> per
// entry — all the per-card rendering logic lives in Card.jsx, this
// component is just responsible for layout (the grid) and passing
// each card its data.
export default function Board({ deck, columns, fadedIds, onCardClick, interactive }) {
  const rows = Math.ceil(deck.length / columns);

  return (
    <div
      className="card-grid"
      style={{
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        "--cols": columns,
        "--rows": rows,
      }}
    >
      {deck.map((card) => (
        <Card
          key={card.id}
          card={card}
          faded={fadedIds.includes(card.id)}
          interactive={interactive}
          onClick={onCardClick}
        />
      ))}
    </div>
  );
}