import Card from "./Card";

// Renders the grid of cards (creates the layout) and passes the data

export default function Board({ deck, columns, rows, fadedIds, onCardClick, interactive }) {
  return (
    <div
      className="mem-card-grid"
      style={{
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        '--cols': columns,
        '--rows': rows,
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