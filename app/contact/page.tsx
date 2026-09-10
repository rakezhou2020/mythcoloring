import { pageMetadata } from "../../lib/seo";

export const metadata = pageMetadata(
  "Contact Myth Coloring",
  "Find contact information and share feedback about Myth Coloring's free printable pages.",
  "/contact/",
);

export default function Page() {
  return (
    <div className="wrap page-content">
      <header className="page-heading">
        <p className="eyebrow">Myth Coloring</p>
        <h1>Contact</h1>
        <p>Questions, feedback, and ideas for future coloring pages are welcome.</p>
      </header>
      <div className="prose">
        <h2>Get in touch</h2>
        <p>
          Myth Coloring is an evolving collection of free mythical creature
          coloring pages. We welcome thoughtful feedback about the site,
          artwork, and future creatures to explore.
        </p>
        <h2>Before you write</h2>
        <p>
          Please visit the Coloring Pages and Creatures sections first: many
          common questions about printing, downloads, and color guides are
          answered there. Contact details will be added here as the site grows.
        </p>
      </div>
    </div>
  );
}
