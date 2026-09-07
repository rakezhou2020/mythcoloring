import { notFound } from "next/navigation";
import { publishedThemes } from "../../../data/themes";
import { publishedColoringPages } from "../../../data/coloring-pages";
import { ColoringGrid } from "../../../components/coloring-grid";
import { pageMetadata } from "../../../lib/seo";
type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() {
  return publishedThemes.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const t = publishedThemes.find((t) => t.slug === slug);
  if (!t) notFound();
  return pageMetadata(
    t.name + " Coloring Pages",
    t.shortDescription,
    "/themes/" + slug + "/",
  );
}
export default async function Page({ params }: Props) {
  const { slug } = await params;
  const t = publishedThemes.find((t) => t.slug === slug);
  if (!t) notFound();
  return (
    <div className="wrap page-content">
      <header className="page-heading">
        <p className="eyebrow">Coloring collection</p>
        <h1>{t.name} Coloring Pages</h1>
        <p>{t.shortDescription}</p>
      </header>
      <section aria-label={t.name + " coloring pages"}>
        <p className="catalog-note">
          Sample previews · Printable artwork is being prepared.
        </p>
        <ColoringGrid
          items={publishedColoringPages.filter((p) => p.themeSlug === slug)}
        />
      </section>
      <section className="prose theme-about">
        <h2>About the {t.name}</h2>
        <p>{t.longDescription}</p>
      </section>
    </div>
  );
}
