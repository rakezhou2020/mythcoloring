import Link from "next/link";
import { publishedCreatures } from "../../data/creatures";
import { Artwork } from "../../components/artwork";
import { JsonLd } from "../../components/json-ld";
import { pageMetadata, siteUrl } from "../../lib/seo";
export const metadata = pageMetadata(
  "Mythical Creature Coloring Pages – Free Printables",
  "Explore free printable mythical creature coloring pages, fantasy creature line art, and coloring inspiration from MythColoring.",
  "/creatures/",
);
export default function Page() {
  return (
    <div className="wrap page-content">
      <JsonLd data={{ "@context": "https://schema.org", "@graph": [{ "@type": "WebPage", name: "Mythical Creatures Coloring Pages", url: siteUrl + "/creatures/" }, { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteUrl + "/" }, { "@type": "ListItem", position: 2, name: "Mythical Creatures", item: siteUrl + "/creatures/" }] }] }} />
      <header className="page-heading">
        <p className="eyebrow">Stories behind the pages</p>
        <h1>Mythical Creatures Coloring Pages</h1>
        <p>
          Explore free printable mythical creatures coloring pages, from Chinese celestial guardians and dragons to legendary beasts, mythical birds, and ancient monsters.
        </p>
      </header>
      <section className="prose category-introduction"><p>These printable mythical creatures bring folklore and ancient imagination to the coloring table. Each real entry in this collection pairs a coloring page with creature notes about its appearance, origins, mythology, and symbolism. Meet legendary creatures from Chinese mythology, including the Azure Dragon Qinglong and the Four Symbols, then print clean line art or use the color reference as a starting point. The collection will grow from genuine artwork and researched stories, rather than empty category pages.</p></section>
      <section className="prose entity-summary" aria-labelledby="creature-quick-guide"><h2 id="creature-quick-guide">What You Will Find Here</h2><p>Each creature page gives a direct answer to what the being is, then separates traditional origin and cultural context from the site&apos;s own artwork interpretation. When a printable is available, the page also explains how to print or download it.</p></section>
      <div className="creature-grid">
        {publishedCreatures.map((c) => (
          <Link
            className="creature-card"
            key={c.slug}
            href={"/creatures/" + c.slug + "/"}
          >
            <div className="creature-art">
              <Artwork name={c.name} src={c.heroImage} colored />
            </div>
            <div className="card-body">
              <h2>{c.name}</h2>
              <p>{c.shortDescription}</p>
              <span className="text-link">Read the story →</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
