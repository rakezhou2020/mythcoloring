import { pageMetadata } from "../../lib/seo";

export const metadata = pageMetadata(
  "Privacy Policy",
  "Read how Myth Coloring handles website information and uses cookies and analytics.",
  "/privacy-policy/",
);

export default function Page() {
  return (
    <div className="wrap page-content">
      <header className="page-heading">
        <p className="eyebrow">Myth Coloring</p>
        <h1>Privacy Policy</h1>
        <p>How we handle information when you visit Myth Coloring.</p>
      </header>
      <div className="prose">
        <h2>Information we collect</h2>
        <p>
          Myth Coloring does not require accounts, memberships, or purchases.
          We do not ask visitors to provide personal information in order to
          browse, print, or download coloring pages.
        </p>
        <h2>Analytics and cookies</h2>
        <p>
          We use Google Analytics to understand general site traffic and
          improve the site. Google may use cookies or similar technologies to
          provide these aggregated measurements.
        </p>
        <h2>External links</h2>
        <p>
          Some pages may link to third-party services. Their privacy practices
          are governed by their own policies, not this one.
        </p>
        <h2>Updates</h2>
        <p>
          We may update this policy as the site grows. Changes will be posted
          on this page.
        </p>
      </div>
    </div>
  );
}
