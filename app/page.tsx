import Link from "next/link";
import { Artwork } from "../components/artwork";
import { ThemeCards } from "../components/theme-cards";
import { homeHeroProduct } from "../data/coloring-pages";
import { pageMetadata } from "../lib/seo";
export const metadata = pageMetadata(
  "Free Printable Coloring Pages",
  "Discover free printable coloring pages with clean line art, coloring inspiration, and finished artwork from mythical creatures and fantasy designs.",
  "/",
);
export default function Home() {
  const hero = homeHeroProduct;
  return (
    <>
      <section className="hero wrap">
        <div>
          <p className="eyebrow">Myths to discover. Creatures to color.</p>
          <h1>Free Printable Coloring Pages</h1>
          <p className="lead">
            Discover free coloring pages with clean line art, coloring
            inspiration, and finished artwork from legendary creatures and
            fantasy designs.
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
              <Artwork name={hero.title} src={hero.lineArtImage} priority />
              <figcaption>Line art</figcaption>
            </figure>
            <span className="comparison-arrow" aria-hidden="true">
              →
            </span>
            <figure>
              <Artwork
                name={hero.title}
                src={hero.colorGuideImage}
                colored
                priority
              />
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
        </div>
        <p className="catalog-note">
          Browse the full collection of printable mythical creature coloring
          pages, color guides, and finished artwork.
        </p>
        <Link className="button primary" href="/coloring-pages/">
          Browse All Coloring Pages
        </Link>
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
          We bring mythical creatures to life through free printable coloring
          pages. Start with the Shan Hai Jing, explore our <Link href="/creatures/">mythical creature coloring pages</Link>, and discover a story with every new page.
        </p>
        <Link className="text-link" href="/about/">
          About Myth Coloring →
        </Link>
      </section>
    </>
  );
}
