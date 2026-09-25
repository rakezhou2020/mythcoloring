export type Status = "draft" | "published";
export type Theme = {
  slug: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  heroImage: string | null;
  status: Status;
};
export type Creature = {
  slug: string;
  name: string;
  localName: string;
  themeSlug: string;
  origin: string;
  shortDescription: string;
  appearance: string;
  legend: string;
  symbolism: string;
  heroImage: string | null;
  featured: boolean;
  status: Status;
};
export type ColoringPage = {
  id: string;
  slug: string;
  title: string;
  creatureSlug: string;
  themeSlug: string;
  type: "Coloring Page" | "Color by Number";
  difficulty: "Easy" | "Medium" | "Detailed";
  colorCount: number | null;
  lineArtImage: string | null;
  colorGuideImage: string | null;
  finishedImage: string | null;
  printPdf: string | null;
  /** Optional destination for a finished-art poster. It is intentionally absent from free-product cards. */
  amazonPosterUrl?: string | null;
  featured: boolean;
  status: Status;
};

/** A reusable taxonomy entry for non-mythology printable coloring pages. */
export type StandardColoringCategory = {
  slug: string;
  name: string;
  description: string;
  status: Status;
};

/**
 * Deliberately separate from ColoringPage: standard pages never inherit the
 * creature story, color-guide, PDF, or poster fields used by the legacy
 * mythology product system.
 */
export type StandardColoringPage = {
  slug: string;
  categorySlug: string;
  title: string;
  shortIntroduction: string;
  coloringTips: string[];
  lineArtImage: string;
  colorImage: string;
  imageAlt: string;
  seo: {
    title: string;
    description: string;
  };
  relatedSlugs?: string[];
  featured: boolean;
  status: Status;
};

export type ContentTheme = {
  slug: string;
  name: string;
  description: string;
  categorySlugs: string[];
  status: Status;
};
