import Link from "next/link";
import { publishedCreatures } from "../../data/creatures";
import { Artwork } from "../../components/artwork";
import { pageMetadata } from "../../lib/seo";
export const metadata = pageMetadata(
  "Mythical Creatures and Their Stories",
  "Meet the creatures behind our coloring pages through introductory creature notes.",
  "/creatures/",
);
export default function Page() {
  return (
    <div className="wrap page-content">
      <header className="page-heading">
        <p className="eyebrow">Stories behind the pages</p>
        <h1>Mythical Creatures</h1>
        <p>
          A small, growing guide to the creatures that inspire our coloring
          collection.
        </p>
      </header>
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
