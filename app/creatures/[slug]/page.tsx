import Link from "next/link";
import { notFound } from "next/navigation";
import { publishedCreatures } from "../../../data/creatures";
import { publishedColoringPages } from "../../../data/coloring-pages";
import { ColoringGrid } from "../../../components/coloring-grid";
import { Artwork } from "../../../components/artwork";
import { Breadcrumbs } from "../../../components/breadcrumbs";
import { JsonLd } from "../../../components/json-ld";
import { pageMetadata, siteUrl } from "../../../lib/seo";
type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;

function creatureMetaDescription(name: string, shortDescription: string) {
  const text = "Download a free printable " + name + " coloring page. " + shortDescription;
  if (text.length <= 160) return text;
  return text.slice(0, 157).replace(/\s+\S*$/, "") + "…";
}

export function generateStaticParams() {
  return publishedCreatures.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const c = publishedCreatures.find((c) => c.slug === slug);
  if (!c) notFound();
  return pageMetadata(
    c.name + " Coloring Page – Free Printable",
    creatureMetaDescription(c.name, c.shortDescription),
    "/creatures/" + slug + "/",
  );
}
export default async function Page({ params }: Props) {
  const { slug } = await params;
  const c = publishedCreatures.find((c) => c.slug === slug);
  if (!c) notFound();
  const printablePages = publishedColoringPages.filter(
    (p) => p.creatureSlug === slug,
  );
  const relatedPages = publishedColoringPages
    .filter((p) => p.creatureSlug !== slug)
    .slice(0, 6);
  const primaryPage = printablePages[0];
  const pageUrl = siteUrl + "/creatures/" + slug + "/";
  const description = creatureMetaDescription(c.name, c.shortDescription);
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        name: c.name + " Coloring Page",
        description,
        url: pageUrl,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteUrl + "/" },
          { "@type": "ListItem", position: 2, name: "Creatures", item: siteUrl + "/creatures/" },
          { "@type": "ListItem", position: 3, name: c.name + " Coloring Page", item: pageUrl },
        ],
      },
      ...(c.heroImage
        ? [{
            "@type": "ImageObject",
            contentUrl: siteUrl + c.heroImage,
            name: c.name + " finished artwork",
            description: c.name + " coloring inspiration",
          }]
        : []),
    ],
  };
  return (
    <div className="wrap page-content">
      <JsonLd data={schema} />
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Creatures", href: "/creatures/" },
          { label: c.name + " Coloring Page" },
        ]}
      />
      <header className="page-heading">
        <p className="eyebrow">Creature notes · {c.localName}</p>
        <h1>{c.name} Coloring Page</h1>
        <p>{c.shortDescription}</p>
      </header>
      {primaryPage && (
        <section className="creature-printable section" aria-labelledby="printable-page">
          <div className="section-heading">
            <div>
              <h2 id="printable-page">Printable Coloring Page</h2>
              <p className="section-intro">
                Print the clean black-and-white line art, or download the A4-friendly PDF for your coloring table.
              </p>
            </div>
          </div>
          <ColoringGrid items={[primaryPage]} />
        </section>
      )}
      {primaryPage?.colorGuideImage && (
        <section className="creature-art-section section" aria-labelledby="coloring-inspiration">
          <div className="section-heading">
            <div>
              <h2 id="coloring-inspiration">Coloring Inspiration</h2>
              <p className="section-intro">Use this flat-color guide as inspiration while you make the page your own.</p>
            </div>
          </div>
          <div className="detail-art">
            <Artwork
              name={c.name}
              src={primaryPage.colorGuideImage}
              colored
              alt={c.name + " coloring inspiration with flat colors"}
            />
          </div>
        </section>
      )}
      {primaryPage?.finishedImage && (
        <section className="creature-art-section section" aria-labelledby="finished-artwork">
          <div className="section-heading">
            <div>
              <h2 id="finished-artwork">Finished Artwork</h2>
              <p className="section-intro">A finished version of the design, shown as a color reference rather than a rule.</p>
            </div>
          </div>
          <div className="detail-art">
            <Artwork
              name={c.name}
              src={primaryPage.finishedImage}
              colored
              alt={"Finished " + c.name + " mythical creature artwork"}
            />
          </div>
        </section>
      )}
      <section className="creature-detail section" aria-labelledby="about-creature">
        <div className="prose">
          <h2 id="about-creature">About {c.name}</h2>
          {(["origin", "appearance", "legend", "symbolism"] as const).map(
            (key) => (
              <section key={key}>
                <h3>{key.charAt(0).toUpperCase() + key.slice(1)}</h3>
                <p>{c[key]}</p>
              </section>
            ),
          )}
        </div>
        {c.heroImage && (
          <div className="detail-art">
            <Artwork
              name={c.name}
              src={c.heroImage}
              colored
              alt={"Finished " + c.name + " mythical creature artwork"}
            />
          </div>
        )}
      </section>
      <section className="prose section" aria-labelledby="coloring-ideas">
        <h2 id="coloring-ideas">Coloring Ideas</h2>
        <p>
          The color reference is only a starting point. Try a palette that feels right to you: soft pencils for a quiet, storybook look, bold markers for stronger contrast, or colors inspired by a favorite landscape. You do not need to match the finished artwork exactly—this {c.name} coloring page is yours to explore.
        </p>
      </section>
      <section className="prose section" aria-labelledby="printing-tips">
        <h2 id="printing-tips">Printing Tips</h2>
        <ul className="printing-tips">
          <li>Print the black-and-white PDF at A4 size or choose “Fit to page.”</li>
          <li>Use crayons, colored pencils, or markers on a paper weight that suits your tools.</li>
          <li>Keep the color guide on screen or beside you for inspiration while coloring.</li>
        </ul>
      </section>
      <section className="section" aria-labelledby="related-coloring-pages">
        <div className="section-heading">
          <div>
            <h2 id="related-coloring-pages">Related Coloring Pages</h2>
            <p className="section-intro">Continue with other free printable designs from our growing collection.</p>
          </div>
          <Link className="text-link" href="/coloring-pages/">
            Browse all coloring pages →
          </Link>
        </div>
        {relatedPages.length > 0 ? <ColoringGrid items={relatedPages} /> : <p className="catalog-note">More coloring pages are being prepared.</p>}
        <p className="hub-link">
          Looking for stories too? Explore our <Link href="/creatures/">mythical creature coloring pages</Link> and creature notes.
        </p>
      </section>
    </div>
  );
}
