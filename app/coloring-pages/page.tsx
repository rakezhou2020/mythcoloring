import { ColoringGrid } from "../../components/coloring-grid";
import { publishedColoringPages } from "../../data/coloring-pages";
import { pageMetadata } from "../../lib/seo";
export const metadata = pageMetadata(
  "Free Printable Mythical Creature Coloring Pages",
  "Browse mythical creature coloring pages and color-by-number designs from the Shan Hai Jing.",
  "/coloring-pages/",
);
export default function Page() {
  return (
    <div className="wrap page-content">
      <header className="page-heading">
        <p className="eyebrow">The coloring collection</p>
        <h1>Free Mythical Creature Coloring Pages</h1>
        <p>
          Find a creature, choose a page, and make it your own. Explore line art
          and color-by-number designs.
        </p>
      </header>
      <section aria-label="Coloring pages">
        <p className="catalog-note">All printable pages are free.</p>
        <ColoringGrid items={publishedColoringPages} />
      </section>
    </div>
  );
}
