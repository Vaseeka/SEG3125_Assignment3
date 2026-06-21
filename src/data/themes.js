// Since there are more cards than I actually need, the cards are randomly selected from a subset each time
function buildPool(prefix, count) {
  return Array.from({ length: count }, (_, i) => `/images/${prefix}/${prefix}-${i + 1}.png`);
}

export const THEMES = {
  mario: { label: "Mario", iconSrc: "/images/icons/mario.png", pool: buildPool("mario", 15) },
  kirby: { label: "Kirby", iconSrc: "/images/icons/kirby.png", pool: buildPool("kirby", 20) },
  pokemon: { label: "Pokemon", iconSrc: "/images/icons/pokemon.png", pool: buildPool("pokemon", 17) },
};
