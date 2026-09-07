import type { ColoringPage } from "./types";
import { publishedThemes } from "./themes";
// Published sample cards; null resources must not create downloadable links.
export const coloringPages: ColoringPage[] = [
  ["nine-tailed-fox", "Nine-Tailed Fox"],
  ["qiongqi", "Qiongqi"],
  ["bifang", "Bifang"],
  ["lushu", "Lushu"],
].flatMap(([creatureSlug, title]) =>
  (["Coloring Page", "Color by Number"] as const).map((type, index) => ({
    id: creatureSlug + "-" + index,
    slug: creatureSlug + (index ? "-color-by-number" : "-coloring-page"),
    title,
    creatureSlug,
    themeSlug: "shan-hai-jing",
    type,
    difficulty: index ? "Medium" : "Easy",
    colorCount: index ? 12 : null,
    lineArtImage: null,
    colorImage: null,
    pdfUrl: null,
    printImage: null,
    featured: true,
    status: "published",
  })),
);
export const publishedColoringPages = coloringPages.filter(
  (p) =>
    p.status === "published" &&
    publishedThemes.some((t) => t.slug === p.themeSlug),
);
