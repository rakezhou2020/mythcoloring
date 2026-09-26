import { notFound } from "next/navigation";
import { Breadcrumbs } from "../../../../components/breadcrumbs";
import { JsonLd } from "../../../../components/json-ld";
import { StandardColoringPage } from "../../../../components/standard-coloring-page";
import { StandardColoringGrid } from "../../../../components/standard-coloring-grid";
import { publishedStandardColoringCategories, publishedStandardColoringPages } from "../../../../data/standard-coloring-pages";
import { pageMetadata, siteUrl } from "../../../../lib/seo";

type Props = { params: Promise<{ category: string; slug: string }> };
export const dynamicParams = false;

export function generateStaticParams() {
  return publishedStandardColoringPages.map((page) => ({ category: page.categorySlug, slug: page.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { category, slug } = await params;
  const page = publishedStandardColoringPages.find((item) => item.categorySlug === category && item.slug === slug);
  if (!page) notFound();
  return pageMetadata(page.seo.title, page.seo.description, `/coloring-pages/${category}/${slug}/`, {
    url: page.lineArtImage,
    alt: page.imageAlt,
  });
}

export default async function StandardPage({ params }: Props) {
  const { category: categorySlug, slug } = await params;
  const category = publishedStandardColoringCategories.find((item) => item.slug === categorySlug);
  const page = publishedStandardColoringPages.find((item) => item.categorySlug === categorySlug && item.slug === slug);
  if (!category || !page) notFound();
  const url = `${siteUrl}/coloring-pages/${categorySlug}/${slug}/`;
  const related = publishedStandardColoringPages.filter((item) => item.categorySlug === categorySlug && item.slug !== slug);
  return (
    <div className="wrap page-content">
      <JsonLd data={{ "@context": "https://schema.org", "@graph": [
        { "@type": "WebPage", name: page.title, description: page.seo.description, url, primaryImageOfPage: page.lineArtImage },
        { "@type": "ImageObject", contentUrl: page.lineArtImage, name: `${page.title} line art`, description: page.imageAlt },
        { "@type": "BreadcrumbList", itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteUrl + "/" },
          { "@type": "ListItem", position: 2, name: "Coloring Pages", item: siteUrl + "/coloring-pages/" },
          { "@type": "ListItem", position: 3, name: category.name, item: `${siteUrl}/coloring-pages/${categorySlug}/` },
          { "@type": "ListItem", position: 4, name: page.title, item: url },
        ] },
      ] }} />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Coloring Pages", href: "/coloring-pages/" }, { label: category.name, href: `/coloring-pages/${categorySlug}/` }, { label: page.title }]} />
      <header className="page-heading"><p className="eyebrow">{category.name}</p><h1>{page.title}</h1></header>
      <StandardColoringPage page={page} />
      <section className="prose standard-content"><h2>About this coloring page</h2><p>{page.shortIntroduction}</p></section>
      <section className="prose standard-content"><h2>Coloring Tips</h2><ul className="printing-tips">{page.coloringTips.map((tip) => <li key={tip}>{tip}</li>)}</ul></section>
      <section className="standard-content"><h2>Related Coloring Pages</h2><StandardColoringGrid items={related} randomize limit={4} /></section>
    </div>
  );
}
