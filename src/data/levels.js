// 4 columns fixed, rows grow by 1 per difficulty step, so the board is
// always the same width and just gets taller. star icons for difficulty.
export const LEVELS = {
  easy: { label: "Easy", cols: 4, rows: 2, pairs: 4, stars: 1 },
  medium: { label: "Medium", cols: 4, rows: 3, pairs: 6, stars: 2 },
  hard: { label: "Hard", cols: 4, rows: 4, pairs: 8, stars: 3 },
};
