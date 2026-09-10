import { pageMetadata } from "../../lib/seo";

export const metadata = pageMetadata(
  "Licensing",
  "Learn about personal use, commercial licensing, and artwork enquiries for MythColoring.",
  "/licensing/",
);

export default function Page() {
  return (
    <div className="wrap page-content">
      <header className="page-heading">
        <p className="eyebrow">MythColoring</p>
        <h1>Licensing</h1>
        <p>Guidance for using MythColoring artwork and content.</p>
      </header>
      <div className="prose">
        <h2>Free personal use</h2>
        <p>
          Printable coloring pages are free for personal, classroom, and other
          non-commercial use. Please keep the artwork and its credit intact.
        </p>
        <h2>Commercial use</h2>
        <p>
          Commercial use, reproduction, resale, and distribution require prior
          written permission. This includes products, publications, marketing,
          digital downloads, and merchandise.
        </p>
        <h2>Licensing and collaboration</h2>
        <p>
          For licensing, poster, publishing, or collaboration enquiries, email{" "}
          <a href="mailto:rakezhou2020@gmail.com">rakezhou2020@gmail.com</a> with
          a short description of your intended use.
        </p>
      </div>
    </div>
  );
}
