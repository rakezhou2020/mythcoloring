import Link from "next/link";
import { publishedCreatures } from "../../data/creatures";
import { Artwork } from "../../components/artwork";
import { pageMetadata } from "../../lib/seo";
export const metadata = pageMetadata(
  "Mythical Creature Coloring Pages – Free Printables",
  "Explore free printable mythical creature coloring pages, fantasy creature line art, and coloring inspiration from MythColoring.",
  "/creatures/",
);
export default function Page() {
  return (
    <div className="wrap page-content">
      <header className="page-heading">
        <p className="eyebrow">Stories behind the pages</p>
        <h1>Free Mythical Creature Coloring Pages</h1>
        <p>
          Explore free printable mythical and fantasy creature coloring pages,
          then discover the stories and coloring inspiration behind each design.
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
