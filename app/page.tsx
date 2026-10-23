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
  const flowers = publishedStandardColoringCategories.find((category) => category.slug === "flowers-plants");
  const animals = publishedStandardColoringCategories.find((category) => category.slug === "animals");
  const flowerPages = publishedStandardColoringPages.filter((page) => page.categorySlug === "flowers-plants");
  const animalPages = publishedStandardColoringPages.filter((page) => page.categorySlug === "animals");
  const halloweenPages = publishedStandardColoringPages.filter((page) => page.categorySlug === "halloween");
  const callaLily = flowerPages.find((page) => page.slug === "calla-lily");
  const cosmos = flowerPages.find((page) => page.slug === "cosmos");
  const animalPreview = animalPages.find((page) => page.slug === "round-hen") ?? animalPages[0];
  const halloweenPreview = halloweenPages.find((page) => page.slug === "jack-o-lantern") ?? halloweenPages[0];
  const qinglongPage = publishedColoringPages.find((page) => page.slug === "qinglong");
  const popularCategories = [
    flowers && { name: flowers.name, description: flowers.description, count: `${flowerPages.length} Coloring Pages`, href: `/coloring-pages/${flowers.slug}/`, image: callaLily?.lineArtImage ?? flowerPages[0]?.lineArtImage, alt: callaLily?.imageAlt ?? flowerPages[0]?.imageAlt ?? "Flowers and plants coloring pages" },
    animals && { name: animals.name, description: animals.description, count: `${animalPages.length} Coloring Pages`, href: `/coloring-pages/${animals.slug}/`, image: animalPreview?.lineArtImage, alt: animalPreview?.imageAlt ?? "Animal coloring pages" },
    { name: "Mythical Creatures", description: "Legendary creatures from ancient stories, ready to color.", count: `${publishedColoringPages.length} Creatures`, href: "/themes/shan-hai-jing/", image: qinglongPage?.lineArtImage, alt: "Qinglong mythical creature printable line art" },
  ].filter((category): category is NonNullable<typeof category> => Boolean(category));
  const explorePages = [
    { title: "Flower Coloring Pages", label: "Category", href: "/coloring-pages/flowers-plants/", image: callaLily?.lineArtImage, alt: callaLily?.imageAlt ?? "Flower coloring pages" },
    { title: "Animal Coloring Pages", label: "Category", href: "/coloring-pages/animals/", image: animalPreview?.lineArtImage, alt: animalPreview?.imageAlt ?? "Animal coloring pages" },
    { title: "Mythical Creatures Coloring Pages", label: "Creatures · Stories", href: "/creatures/", image: qinglongPage?.lineArtImage, alt: "Qinglong mythical creature printable line art" },
    { title: "Calla Lily Coloring Page", label: "Flower · Printable", href: "/coloring-pages/flowers-plants/calla-lily/", image: callaLily?.lineArtImage, alt: callaLily?.imageAlt ?? "Calla Lily coloring page" },
    { title: "Cosmos Coloring Page", label: "Flower · Printable", href: "/coloring-pages/flowers-plants/cosmos/", image: cosmos?.lineArtImage, alt: cosmos?.imageAlt ?? "Cosmos coloring page" },
    { title: "Qinglong", label: "Mythical Creature · Story & Coloring", href: "/creatures/qinglong/", image: qinglongPage?.lineArtImage, alt: "Qinglong printable coloring page" },
  ];
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
        <div className="popular-category-grid">
          {popularCategories.map((category) => <Link className="popular-category-card" href={category.href} key={category.name}>
            <div className="popular-category-copy"><p className="eyebrow">{category.count}</p><h3>{category.name}</h3><p>{category.description}</p><span className="card-cta">Explore <span aria-hidden="true">→</span></span></div>
            <div className="popular-category-art"><Artwork name={category.name} src={category.image} alt={category.alt} /></div>
          </Link>)}
        </div>
      </section>
      {halloweenPreview && <section className="section wrap halloween-home-entry" aria-labelledby="halloween-home-entry">
        <div className="halloween-home-copy"><p className="eyebrow">Seasonal collection</p><h2 id="halloween-home-entry">Halloween Coloring Pages <span aria-hidden="true">🎃</span></h2><p>Explore printable pumpkins, ghosts, witches, haunted houses, and spooky Halloween designs.</p><Link className="text-link" href="/coloring-pages/halloween/">Explore Halloween Pages <span aria-hidden="true">→</span></Link></div>
        <div className="halloween-home-art"><Artwork name="Halloween Coloring Pages" src={halloweenPreview.lineArtImage} alt={halloweenPreview.imageAlt} /></div>
      </section>}
      <section className="section wrap explore-coloring-section" aria-labelledby="explore-coloring-pages">
        <div className="section-heading"><div><p className="eyebrow">Start here</p><h2 id="explore-coloring-pages">Explore Coloring Pages</h2></div></div>
        <div className="explore-page-grid">
          {explorePages.map((page) => <Link className="explore-page-card" href={page.href} key={page.href}>
            <div className="explore-page-art"><Artwork name={page.title} src={page.image} alt={page.alt} /></div>
            <div className="explore-page-copy"><h3>{page.title}</h3><p>{page.label}</p></div>
            <span className="explore-page-arrow" aria-hidden="true">→</span>
          </Link>)}
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
