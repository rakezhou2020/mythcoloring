import type { ColoringPage } from "./types";
import { publishedThemes } from "./themes";
import deerProduct from "../mythcoloring-workflow/output/nine-colored-deer/product.json";
import wingedMonkeyProduct from "../mythcoloring-workflow/output/winged-monkey/product.json";
import armadilloProduct from "../mythcoloring-workflow/output/armadillo/product.json";
import xuanGuiProduct from "../mythcoloring-workflow/output/xuan-gui/product.json";

const nineColoredDeer: ColoringPage = {
  ...deerProduct,
  id: deerProduct.slug,
  creatureSlug: deerProduct.slug,
  type: "Coloring Page",
  difficulty: "Easy",
  colorCount: 9,
  featured: true,
  status: "published",
};

const wingedMonkey: ColoringPage = {
  ...wingedMonkeyProduct,
  id: wingedMonkeyProduct.slug,
  creatureSlug: "white-ape",
  type: "Coloring Page",
  difficulty: "Medium",
  colorCount: 9,
  featured: true,
  status: "published",
};

// Creator-supplied artwork is registered locally as a draft. It becomes
// visible in the public catalog only after its status is intentionally changed.
const armadillo: ColoringPage = {
  ...armadilloProduct,
  id: armadilloProduct.slug,
  creatureSlug: armadilloProduct.slug,
  type: "Coloring Page",
  difficulty: "Medium",
  colorCount: null,
  featured: true,
  status: "published",
};

const xuanGui: ColoringPage = {
  ...xuanGuiProduct,
  id: xuanGuiProduct.slug,
  creatureSlug: xuanGuiProduct.slug,
  type: "Coloring Page",
  difficulty: "Detailed",
  colorCount: 7,
  featured: true,
  status: "published",
};

// Product cards always use the same four resource fields. A null field makes
// the corresponding preview or action unavailable rather than inventing a URL.
const sampleColoringPages: ColoringPage[] = [
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
    colorGuideImage: null,
    finishedImage: null,
    printPdf: null,
    featured: true,
    status: "draft",
  })),
);

export const coloringPages: ColoringPage[] = [
  nineColoredDeer,
  wingedMonkey,
  armadillo,
  xuanGui,
  ...sampleColoringPages,
];
export const publishedColoringPages = coloringPages.filter(
  (p) =>
    p.status === "published" &&
    publishedThemes.some((t) => t.slug === p.themeSlug),
);

// This is deliberately independent from catalog ordering. Changing which
// product appears first never changes the homepage's two-image hero artwork.
export const homeHeroProduct = nineColoredDeer;
