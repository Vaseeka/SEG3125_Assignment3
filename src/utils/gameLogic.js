import { LEVELS } from "../data/levels";
import { THEMES } from "../data/themes";

export function shuffle(array) {
  const a = [...array];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Picks different image pools each time since more images than pairs
function sampleImages(pool, count) {
  return shuffle(pool).slice(0, count);
}

export function buildDeck(levelKey, themeKey) {
  const { pairs } = LEVELS[levelKey];
  const pool = THEMES[themeKey].pool;
  const chosen = sampleImages(pool, pairs);
  return shuffle([...chosen, ...chosen]).map((src, index) => ({
    id: index,
    src,
    flipped: false,
    matched: false,
  }));
}

export function formatTime(totalSeconds) {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}
