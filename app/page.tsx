import Link from "next/link";
import { Artwork } from "../components/artwork";
import { ColoringGrid } from "../components/coloring-grid";
import { ThemeCards } from "../components/theme-cards";
import { homeHeroProduct, publishedColoringPages } from "../data/coloring-pages";
import { pageMetadata } from "../lib/seo";
export const metadata = pageMetadata(
  "Free Mythical Creature Coloring Pages",
  "Explore legendary creatures through free printable coloring pages and color-by-number art. Discover our Shan Hai Jing collection.",
  "/",
);
export default function Home() {
  const hero = homeHeroProduct;
  return (
    <>
      <section className="hero wrap">
        <div>
          <p className="eyebrow">Myths to discover. Creatures to color.</p>
          <h1>Free Mythical Creature Coloring Pages</h1>
          <p className="lead">
            Explore legendary creatures from ancient myths through free
            printable coloring pages and color-by-number art.
          </p>
          <div className="hero-actions">
            <Link className="button primary" href="/coloring-pages/">
              Browse Coloring Pages
            </Link>
            <Link className="button" href="/themes/">
              Explore Themes
            </Link>
          </div>
          <p className="hero-note">Always free · No signup</p>
        </div>
        {hero && (
          <div
            className="hero-comparison"
            aria-label={hero.title + " line art and color comparison"}
          >
            <figure>
              <Artwork name={hero.title} src={hero.lineArtImage} />
              <figcaption>Line art</figcaption>
            </figure>
            <span className="comparison-arrow" aria-hidden="true">
              →
            </span>
            <figure>
              <Artwork name={hero.title} src={hero.colorGuideImage} colored />
              <figcaption>Color artwork</figcaption>
            </figure>
            <p>{hero.title}</p>
          </div>
        )}
      </section>
      <section className="section wrap">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Make a little room for creativity</p>
            <h2>Free Coloring Pages</h2>
          </div>
          <Link className="text-link" href="/coloring-pages/">
            View all coloring pages →
          </Link>
        </div>
        <p className="catalog-note">
          Start with our first finished printable, then explore the growing
          collection.
        </p>
        <ColoringGrid
          items={publishedColoringPages.filter((p) => p.featured).slice(0, 8)}
        />
      </section>
      <section className="section wrap">
        <div className="section-heading">
          <h2>Explore Themes</h2>
        </div>
        <ThemeCards />
      </section>
      <section className="brand-story wrap">
        <p className="eyebrow">Myth Coloring</p>
        <h2>Every creature has a story.</h2>
        <p>
          We bring mythical creatures from around the world to life through free
          coloring pages. Start with the Shan Hai Jing, and discover a story
          with every new page.
        </p>
        <Link className="text-link" href="/about/">
          About Myth Coloring →
        </Link>
      </section>
    </>
  );
}
