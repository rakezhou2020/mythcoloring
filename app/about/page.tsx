import Link from "next/link";
import { pageMetadata } from "../../lib/seo";
export const metadata = pageMetadata(
  "About Myth Coloring",
  "Myth Coloring brings legendary creatures to life through free coloring pages and short stories.",
  "/about/",
);
export default function Page() {
  return (
    <div className="wrap page-content">
      <header className="page-heading">
        <p className="eyebrow">A little curiosity. A little color.</p>
        <h1>Every creature has a story.</h1>
      </header>
      <div className="prose">
        <h2>About Myth Coloring</h2>
        <p>
          Myth Coloring is a free coloring collection inspired by legendary
          creatures from around the world. Coloring pages come first, with short
          creature notes for anyone who wants to discover more.
        </p>
        <p>
          Our first collection explores the Shan Hai Jing. Current previews are
          illustrative samples while printable artwork is prepared.
        </p>
        <p>
          No account, membership, or payment is needed. Just curiosity and, when
          the pages are ready, your favorite colors.
        </p>
        <Link className="button primary" href="/coloring-pages/">
          Browse Coloring Pages
        </Link>
      </div>
    </div>
  );
}
