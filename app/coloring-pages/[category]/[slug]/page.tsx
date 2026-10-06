import { notFound } from "next/navigation";
import { Breadcrumbs } from "../../../../components/breadcrumbs";
import { JsonLd } from "../../../../components/json-ld";
import { StandardColoringPage } from "../../../../components/standard-coloring-page";
import { StandardColoringGrid } from "../../../../components/standard-coloring-grid";
import { publishedStandardColoringCategories, publishedStandardColoringPages } from "../../../../data/standard-coloring-pages";
import { pageMetadata, siteUrl } from "../../../../lib/seo";
import { printableIntroduction, relatedStandardPages, standardPageSeo } from "../../../../lib/standard-seo";
import { coloringPageEntityNote } from "../../../../lib/entity-context";

type Props = { params: Promise<{ category: string; slug: string }> };
export const dynamicParams = false;

export function generateStaticParams() {
  return publishedStandardColoringPages.map((page) => ({ category: page.categorySlug, slug: page.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { category, slug } = await params;
  const page = publishedStandardColoringPages.find((item) => item.categorySlug === category && item.slug === slug);
  if (!page) notFound();
  const pageCategory = publishedStandardColoringCategories.find((item) => item.slug === category);
  if (!pageCategory) notFound();
  const seo = standardPageSeo(page, pageCategory);
  return pageMetadata(seo.title, seo.description, `/coloring-pages/${category}/${slug}/`, {
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
  const seo = standardPageSeo(page, category);
  const related = relatedStandardPages(page, publishedStandardColoringPages);
  const relatedHeading = categorySlug === "flowers-plants" ? "More Flower Coloring Pages" : "More Coloring Pages You May Like";
  const entityNote = coloringPageEntityNote(page);
  return (
    <div className="wrap page-content">
      <JsonLd data={{ "@context": "https://schema.org", "@graph": [
        { "@type": "WebPage", name: seo.title, description: seo.description, url, primaryImageOfPage: page.lineArtImage },
        { "@type": "ImageObject", contentUrl: page.lineArtImage, name: `${page.title} line art`, description: page.imageAlt },
        { "@type": "BreadcrumbList", itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteUrl + "/" },
          { "@type": "ListItem", position: 2, name: "Coloring Pages", item: siteUrl + "/coloring-pages/" },
          { "@type": "ListItem", position: 3, name: category.name, item: `${siteUrl}/coloring-pages/${categorySlug}/` },
          { "@type": "ListItem", position: 4, name: page.title, item: url },
        ] },
        { "@type": "FAQPage", mainEntity: [
          { "@type": "Question", name: "Is this coloring page free?", acceptedAnswer: { "@type": "Answer", text: `Yes. This ${page.title} is free to print or download from MythColoring.` } },
          { "@type": "Question", name: "Can I print this coloring page?", acceptedAnswer: { "@type": "Answer", text: "Yes. The line-art view is designed for A4 portrait printing." } },
          { "@type": "Question", name: "Can I download the coloring page as PNG?", acceptedAnswer: { "@type": "Answer", text: "Yes. Select a view, then choose Download PNG." } },
        ] },
      ] }} />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Coloring Pages", href: "/coloring-pages/" }, { label: category.name, href: `/coloring-pages/${categorySlug}/` }, { label: page.title }]} />
      <header className="page-heading"><p className="eyebrow">{category.name}</p><h1>{page.title}</h1></header>
      <StandardColoringPage page={page} />
      <section className="prose standard-content"><h2>About this coloring page</h2><p>{page.shortIntroduction}</p><p>{printableIntroduction(page, category)}</p></section>
      {entityNote && <section className="prose standard-content entity-summary"><h2>About the Subject</h2><p>{entityNote}</p></section>}
      <section className="prose standard-content"><h2>Coloring Tips</h2><ul className="printing-tips">{page.coloringTips.map((tip) => <li key={tip}>{tip}</li>)}</ul></section>
      <section className="prose standard-content"><h2>Frequently Asked Questions</h2><h3>Is this coloring page free?</h3><p>Yes. This {page.title.toLowerCase()} is free to print or download from MythColoring.</p><h3>Can I print this coloring page?</h3><p>Yes. Use the Print Coloring Page button to print the current line-art view, designed for an A4 portrait page.</p><h3>Can I download the coloring page as PNG?</h3><p>Yes. Select the line-art or color view, then choose Download PNG.</p></section>
      <section className="standard-content"><h2>{relatedHeading}</h2><StandardColoringGrid items={related} limit={8} /></section>
    </div>
  );
}
