import { pageMetadata } from "../../lib/seo";

export const metadata = pageMetadata(
  "Terms of Use",
  "Read the terms for using Myth Coloring's free mythical creature coloring pages.",
  "/terms/",
);

export default function Page() {
  return (
    <div className="wrap page-content">
      <header className="page-heading">
        <p className="eyebrow">Myth Coloring</p>
        <h1>Terms of Use</h1>
        <p>Simple terms for enjoying Myth Coloring's free resources.</p>
      </header>
      <div className="prose">
        <h2>Personal use</h2>
        <p>
          The printable coloring pages on Myth Coloring are provided for free,
          personal, non-commercial use. You may print and color them at home,
          in classrooms, or in other non-commercial settings.
        </p>
        <h2>Site content</h2>
        <p>
          Please do not sell, redistribute, or present Myth Coloring artwork
          as your own. The creature notes are provided for general interest and
          coloring inspiration.
        </p>
        <h2>Availability</h2>
        <p>
          We may add, update, or remove pages and downloads as the collection
          grows. The site is provided as available.
        </p>
        <h2>Updates</h2>
        <p>
          These terms may change as Myth Coloring develops. The current
          version will always appear on this page.
        </p>
      </div>
    </div>
  );
}
