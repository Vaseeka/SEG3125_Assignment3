// Shared pop-up box shell used by SetupScreen, PauseScreen, and
// WinScreen for consitent look
export default function OverlayBox({ children }) {
  return (
    <div className="overlay">
      <div className="overlay-box">{children}</div>
    </div>
  );
}
