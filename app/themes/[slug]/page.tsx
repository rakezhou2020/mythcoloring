import { notFound } from "next/navigation";
import { publishedThemes } from "../../../data/themes";
import { publishedColoringPages } from "../../../data/coloring-pages";
import { contentThemes, publishedStandardColoringPages } from "../../../data/standard-coloring-pages";
import { ColoringGrid } from "../../../components/coloring-grid";
import { StandardCategoryGrid } from "../../../components/standard-category-grid";
import { Breadcrumbs } from "../../../components/breadcrumbs";
import { pageMetadata } from "../../../lib/seo";

type Props = { params: Promise<{ slug: string }> };
const publishedContentThemes = contentThemes.filter((theme) => theme.status === "published" && theme.slug !== "chinese-mythology");
export const dynamicParams = false;

export function generateStaticParams() {
  return [...publishedThemes, ...publishedContentThemes].map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const collectionTheme = publishedContentThemes.find((theme) => theme.slug === slug);
  const legacyTheme = publishedThemes.find((theme) => theme.slug === slug);
  if (!collectionTheme && !legacyTheme) notFound();
  const name = collectionTheme?.name ?? legacyTheme!.name;
  const description = collectionTheme?.description ?? legacyTheme!.shortDescription;
  return pageMetadata(`${name} Coloring Pages`, description, `/themes/${slug}/`);
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const collectionTheme = publishedContentThemes.find((theme) => theme.slug === slug);
  const legacyTheme = publishedThemes.find((theme) => theme.slug === slug);
  if (!collectionTheme && !legacyTheme) notFound();

  if (collectionTheme) {
    const pages = publishedStandardColoringPages.filter((page) => collectionTheme.categorySlugs.includes(page.categorySlug));
    return (
      <div className="wrap page-content">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Themes", href: "/themes/" }, { label: collectionTheme.name }]} />
        <header className="page-heading">
          <p className="eyebrow">Coloring collection</p>
          <h1>{collectionTheme.name} Coloring Pages</h1>
          <p>{collectionTheme.description}</p>
        </header>
        <section aria-label={`${collectionTheme.name} coloring pages`}>
          <p className="catalog-note">Printable artwork is available below.</p>
          <StandardCategoryGrid items={pages} />
        </section>
      </div>
    );
  }

  const theme = legacyTheme!;
  return (
    <div className="wrap page-content">
      <header className="page-heading">
        <p className="eyebrow">Coloring collection</p>
        <h1>{theme.name} Coloring Pages</h1>
        <p>{theme.shortDescription}</p>
      </header>
      <section aria-label={`${theme.name} coloring pages`}>
        <p className="catalog-note">Printable artwork is available below.</p>
        <ColoringGrid items={publishedColoringPages.filter((page) => page.themeSlug === slug)} />
      </section>
      <section className="prose theme-about"><h2>About the {theme.name}</h2><p>{theme.longDescription}</p></section>
    </div>
  );
}
