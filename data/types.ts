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
  colorImage: string | null;
  pdfUrl: string | null;
  printImage: string | null;
  featured: boolean;
  status: Status;
};
