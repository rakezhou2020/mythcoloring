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
        <h2>Email</h2>
        <p>
          For questions, feedback, licensing enquiries, or collaboration ideas,
          email us at{" "}
          <a href="mailto:rakezhou2020@gmail.com">rakezhou2020@gmail.com</a>.
        </p>
      </div>
    </div>
  );
}
