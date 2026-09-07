import Link from "next/link";
import { notFound } from "next/navigation";
import { publishedCreatures } from "../../../data/creatures";
import { publishedColoringPages } from "../../../data/coloring-pages";
import { ColoringGrid } from "../../../components/coloring-grid";
import { Artwork } from "../../../components/artwork";
import { pageMetadata } from "../../../lib/seo";
type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() {
  return publishedCreatures.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const c = publishedCreatures.find((c) => c.slug === slug);
  if (!c) notFound();
  return pageMetadata(
    c.name + ": Origin, Legend & Coloring Pages",
    c.shortDescription,
    "/creatures/" + slug + "/",
  );
}
export default async function Page({ params }: Props) {
  const { slug } = await params;
  const c = publishedCreatures.find((c) => c.slug === slug);
  if (!c) notFound();
  return (
    <div className="wrap page-content">
      <header className="page-heading">
        <p className="eyebrow">Creature notes · {c.localName}</p>
        <h1>{c.name}</h1>
        <p>{c.shortDescription}</p>
      </header>
      <div className="creature-detail">
        <div className="detail-art">
          <Artwork name={c.name} src={c.heroImage} colored />
        </div>
        <div className="prose">
          {(["origin", "appearance", "legend", "symbolism"] as const).map(
            (key) => (
              <section key={key}>
                <h2>{key.charAt(0).toUpperCase() + key.slice(1)}</h2>
                <p>{c[key]}</p>
              </section>
            ),
          )}
        </div>
      </div>
      <section className="section">
        <div className="section-heading">
          <h2>Related Coloring Pages</h2>
          <Link className="text-link" href="/coloring-pages/">
            Browse all coloring pages →
          </Link>
        </div>
        <ColoringGrid
          items={publishedColoringPages.filter((p) => p.creatureSlug === slug)}
        />
      </section>
    </div>
  );
}
