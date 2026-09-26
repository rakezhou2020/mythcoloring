import Link from "next/link";
import { standardColoringCategories } from "../../data/standard-coloring-pages";
import { pageMetadata } from "../../lib/seo";
export const metadata = pageMetadata(
  "Printable Coloring Page Categories",
  "Browse free printable coloring pages by category, including flowers, plants, animals, buildings, food, vehicles, and nature.",
  "/coloring-pages/",
);
export default function Page() {
  return (
    <div className="wrap page-content">
      <header className="page-heading">
        <p className="eyebrow">The printable collection</p>
        <h1>Free Printable Coloring Pages</h1>
        <p>
          Browse free printable coloring pages by category, from mythical
          creatures and ancient legends to flowers, plants, animals, and more.
        </p>
      </header>
      <section aria-label="Coloring page categories">
        <p className="catalog-note">All printable pages are free. More categories are being prepared.</p>
        <div className="category-grid">
          <Link className="category-card" href="/creatures/">
            <p className="eyebrow">Coloring Pages</p>
            <h2>Mythology</h2>
            <p>Explore mythical creature coloring pages, color guides, and stories from ancient legends.</p>
            <span className="text-link">Explore Mythology →</span>
          </Link>
          {standardColoringCategories.map((category) => category.status === "published" ? (
            <Link className="category-card" href={`/coloring-pages/${category.slug}/`} key={category.slug}>
              <p className="eyebrow">Coloring Pages</p>
              <h2>{category.name}</h2>
              <p>{category.description}</p>
              <span className="text-link">Explore {category.name} →</span>
            </Link>
          ) : (
            <article className="category-card category-card-coming" key={category.slug}>
              <p className="eyebrow">Coloring Pages · Coming soon</p>
              <h2>{category.name}</h2>
              <p>{category.description}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
