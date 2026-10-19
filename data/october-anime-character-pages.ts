import type { StandardColoringPage } from "./types";

const characterNumbers = Array.from({ length: 53 }, (_, index) => index + 130);
const image = (number: number, kind: "line" | "color") =>
  `/coloring-pages/anime-characters-october/anime-character-${number}-${kind}.jpg`;

const tips = [
  "Use the color reference as a guide, or create an entirely new outfit palette.",
  "Shade hair and clothing with two or three related tones for a soft anime-style finish.",
  "Leave small highlights white in the eyes, hair, and accessories.",
];

export const octoberAnimeCharacterPages: StandardColoringPage[] = characterNumbers.map((number, index) => ({
  slug: `anime-character-${number}`,
  categorySlug: "anime-character-art",
  title: `Anime Character ${number} Coloring Page`,
  shortIntroduction: "Color this expressive anime character illustration with your own outfit, hair, and accessory palette.",
  coloringTips: tips,
  lineArtImage: image(number, "line"),
  colorImage: image(number, "color"),
  imageAlt: `Anime character ${number} printable coloring page with line art and color reference`,
  seo: {
    title: `Anime Character ${number} Coloring Page – Free Printable`,
    description: `Download a free printable anime character ${number} coloring page with clean line art and a color reference.`,
  },
  featured: index < 8,
  status: "published",
}));
