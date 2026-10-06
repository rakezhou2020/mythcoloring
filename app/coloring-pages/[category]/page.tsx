import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "../../../components/breadcrumbs";
import { StandardCategoryGrid } from "../../../components/standard-category-grid";
import { publishedStandardColoringCategories, publishedStandardColoringPages } from "../../../data/standard-coloring-pages";
import { JsonLd } from "../../../components/json-ld";
import { pageMetadata, siteUrl } from "../../../lib/seo";

type Props = { params: Promise<{ category: string }> };
export const dynamicParams = false;

export function generateStaticParams() {
  return publishedStandardColoringCategories.map(({ slug }) => ({ category: slug }));
}

export async function generateMetadata({ params }: Props) {
  const { category: slug } = await params;
  const category = publishedStandardColoringCategories.find((item) => item.slug === slug);
  if (!category) notFound();
  return pageMetadata(
    `${category.name} Coloring Pages`,
    `Browse free printable ${category.name.toLowerCase()} coloring pages with line art, color inspiration, and PNG downloads.`,
    `/coloring-pages/${slug}/`,
  );
}

export default async function CategoryPage({ params }: Props) {
  const { category: slug } = await params;
  const category = publishedStandardColoringCategories.find((item) => item.slug === slug);
  if (!category) notFound();
  const pages = publishedStandardColoringPages.filter((page) => page.categorySlug === slug);
  const flowerIntroduction = slug === "flowers-plants" ? "Flower and plant coloring pages are a calm way to explore petals, leaves, stems, and garden scenes. Browse free printable flower coloring sheets for a quick creative break, a classroom activity, or a quiet afternoon at home. Each page includes clean line art to print, a PNG download option, and a color reference for inspiration. Choose delicate tones for a botanical study, make a bright bouquet, or use any colors that suit your style. Start with individual blossoms such as calla lilies and cosmos, then continue through our real collection of roses, sunflowers, orchids, lotuses, peonies, and more." : null;
  const flowerAnswer = slug === "flowers-plants" ? "Flowers and plants are useful coloring subjects because their petals, leaves, stems, and centers create clear areas for simple color choices or detailed shading. The pages in this collection focus on real plant features without requiring botanical knowledge: use the color reference when it helps, or choose an imaginative palette of your own." : null;
  const url = `${siteUrl}/coloring-pages/${slug}/`;
  return (
    <div className="wrap page-content">
      <JsonLd data={{ "@context": "https://schema.org", "@graph": [{ "@type": "WebPage", name: `${category.name} Coloring Pages`, url }, { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteUrl + "/" }, { "@type": "ListItem", position: 2, name: "Coloring Pages", item: siteUrl + "/coloring-pages/" }, { "@type": "ListItem", position: 3, name: category.name, item: url }] }] }} />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Coloring Pages", href: "/coloring-pages/" }, { label: category.name }]} />
      <header className="page-heading">
        <p className="eyebrow">Coloring Pages</p>
        <h1>{category.name} Coloring Pages</h1>
        <p>{category.description}</p>
      </header>
      {flowerIntroduction && <section className="prose category-introduction"><p>{flowerIntroduction}</p></section>}
      {flowerAnswer && <section className="prose entity-summary"><h2>About Flower and Plant Coloring Pages</h2><p>{flowerAnswer}</p></section>}
      {pages.length ? (
        <StandardCategoryGrid items={pages} />
      ) : (
        <section className="empty-state">
          <h2>New pages are growing here.</h2>
          <p>We are preparing the first Flowers &amp; Plants printables. Orchid, Calla Lily, and Lily of the Valley are planned next.</p>
          <Link className="text-link" href="/coloring-pages/">Browse coloring page categories →</Link>
        </section>
      )}
    </div>
  );
}
