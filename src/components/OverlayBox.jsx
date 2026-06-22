// Pop-up page for non game board screens

export default function OverlayBox({ children }) {
  return (
    <div className="overlay">
      <div className="overlay-box">{children}</div>
    </div>
  );
}
