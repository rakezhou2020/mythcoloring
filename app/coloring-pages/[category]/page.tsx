import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "../../../components/breadcrumbs";
import { publishedStandardColoringCategories, publishedStandardColoringPages } from "../../../data/standard-coloring-pages";
import { pageMetadata } from "../../../lib/seo";

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
  return (
    <div className="wrap page-content">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Coloring Pages", href: "/coloring-pages/" }, { label: category.name }]} />
      <header className="page-heading">
        <p className="eyebrow">Coloring Pages</p>
        <h1>{category.name} Coloring Pages</h1>
        <p>{category.description}</p>
      </header>
      {pages.length ? (
        <div className="standard-page-grid">{pages.map((page) => (
          <Link className="standard-page-card" key={page.slug} href={`/coloring-pages/${slug}/${page.slug}/`}>
            <img src={page.lineArtImage} alt={page.imageAlt} width={600} height={750} />
            <span>{page.title}</span>
          </Link>
        ))}</div>
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
