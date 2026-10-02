import Link from "next/link";
import { Artwork } from "../components/artwork";
import { ColoringGrid } from "../components/coloring-grid";
import { StandardColoringGrid } from "../components/standard-coloring-grid";
import { ThemeCards } from "../components/theme-cards";
import { HomeHeroReveal, type HeroRevealItem } from "../components/home-hero-reveal";
import { publishedColoringPages } from "../data/coloring-pages";
import { publishedStandardColoringCategories, publishedStandardColoringPages } from "../data/standard-coloring-pages";
import { pageMetadata } from "../lib/seo";
export const metadata = pageMetadata(
  "Free Printable Coloring Pages",
  "Discover free printable coloring pages with clean line art, coloring inspiration, and finished artwork from mythical creatures and fantasy designs.",
  "/",
);
export default function Home() {
  const heroItems: HeroRevealItem[] = [
    ...publishedStandardColoringPages.filter((page) => page.featured).map((page) => ({ slug: `standard-${page.slug}`, title: page.title, lineArtImage: page.lineArtImage, colorImage: page.colorImage, imageAlt: page.imageAlt })),
    ...publishedColoringPages.filter((page) => page.featured && page.lineArtImage && (page.colorGuideImage || page.finishedImage)).map((page) => ({ slug: `myth-${page.slug}`, title: page.title, lineArtImage: page.lineArtImage!, colorImage: page.colorGuideImage ?? page.finishedImage!, imageAlt: `${page.title} printable coloring page` })),
  ];
  const fourDivineBeasts = ["qinglong", "white-tiger", "zhuque", "xuanwu"].flatMap(
    (slug) => {
      const page = publishedColoringPages.find((item) => item.slug === slug);
      return page ? [page] : [];
    },
  );
  const fourFierceBeasts = ["hundun", "taowu", "qiongqi", "taotie"].flatMap(
    (slug) => {
      const page = publishedColoringPages.find((item) => item.slug === slug);
      return page ? [page] : [];
    },
  );
  return (
    <>
      <section className="hero wrap">
        <div>
          <p className="eyebrow">Discover. Print. Color.</p>
          <h1>Free Printable Coloring Pages</h1>
          <p className="lead">
            Explore free printable coloring pages for kids and adults, from flowers and animals to fantasy creatures, nature, architecture, and more.
          </p>
          <p className="hero-secondary">Clean line art, color references, and easy one-click printing.</p>
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
        <HomeHeroReveal items={heroItems} />
      </section>
      <section className="section wrap">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Legends to discover</p>
            <h2>Mythical Creature Coloring Pages</h2>
          </div>
          <Link className="text-link" href="/coloring-pages/">
            View all coloring pages →
          </Link>
        </div>
        <p className="catalog-note">
          Explore four featured mythical creature printables, then browse the
          full collection for more legends, color guides, and finished artwork.
        </p>
        <ColoringGrid
          items={publishedColoringPages.filter((p) => p.featured)}
          randomize
          limit={4}
        />
      </section>
      <section className="section wrap home-popular-categories">
        <div className="section-heading"><div><p className="eyebrow">Start exploring</p><h2>Popular Categories</h2></div><Link className="text-link" href="/coloring-pages/">View All Coloring Pages →</Link></div>
        <div className="home-category-grid">
          {["flowers-plants", "animals"].flatMap((slug) => publishedStandardColoringCategories.filter((category) => category.slug === slug)).map((category) => <Link className="home-category-card" href={`/coloring-pages/${category.slug}/`} key={category.slug}><h3>{category.name}</h3><p>{category.description}</p><span className="text-link">Explore →</span></Link>)}
          <Link className="home-category-card" href="/themes/shan-hai-jing/"><h3>Mythical Creatures</h3><p>Legendary creatures from ancient stories, ready to color.</p><span className="text-link">Explore →</span></Link>
        </div>
      </section>
      <section className="section wrap">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Fresh picks</p>
            <h2>New Coloring Pages</h2>
          </div>
          <Link className="text-link" href="/coloring-pages/">
            View all coloring pages →
          </Link>
        </div>
        <p className="catalog-note">
          Discover free flowers, plants, animals, and more creative printables
          from our growing collection.
        </p>
        <StandardColoringGrid
          items={publishedStandardColoringPages}
          randomize
          limit={16}
          deferColors
        />
      </section>
      <section className="section wrap">
        <div className="section-heading">
          <h2>The Four Divine Beasts</h2>
        </div>
        <div className="divine-beast-grid">
          {fourDivineBeasts.map((beast) => (
            <Link
              className="divine-beast-card"
              href={`/creatures/${beast.creatureSlug}/`}
              key={beast.id}
            >
              <Artwork
                colored
                name={beast.title}
                src={beast.finishedImage ?? beast.colorGuideImage}
              />
              <span>{beast.title.replace(" Coloring Page", "")}</span>
            </Link>
          ))}
        </div>
      </section>
      <section className="section wrap">
        <div className="section-heading">
          <h2>The Four Fierce Beasts</h2>
        </div>
        <div className="divine-beast-grid">
          {fourFierceBeasts.map((beast) => (
            <Link
              className="divine-beast-card"
              href={`/creatures/${beast.creatureSlug}/`}
              key={beast.id}
            >
              <Artwork
                colored
                name={beast.title}
                src={beast.finishedImage ?? beast.colorGuideImage}
              />
              <span>{beast.title.replace(" Coloring Page", "")}</span>
            </Link>
          ))}
        </div>
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
