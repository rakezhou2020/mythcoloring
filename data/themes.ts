import type { Theme } from "./types";
export const themes: Theme[] = [
  {
    slug: "shan-hai-jing",
    name: "Shan Hai Jing",
    shortDescription:
      "Explore strange beasts and legendary creatures from one of ancient China’s most fascinating mythological texts.",
    longDescription:
      "Our Shan Hai Jing collection brings a world of strange creatures into a quiet creative activity. Begin with a coloring page, then explore a short creature introduction if you would like to learn more. This introductory collection will grow as artwork and editorial notes are prepared.",
    heroImage: "/themes/shan-hai-jing-banner.jpg",
    status: "published",
  },
];
export const publishedThemes = themes.filter((t) => t.status === "published");
