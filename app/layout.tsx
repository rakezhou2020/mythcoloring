import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { JsonLd } from "../components/json-ld";
import { siteName, siteUrl } from "../lib/seo";
import "./globals.css";
export const metadata: Metadata = {
  metadataBase: new URL("https://mythcoloring.com"),
  title: { default: "Myth Coloring", template: "%s | Myth Coloring" },
  description:
    "Free mythical creature coloring pages and the stories behind them.",
  icons: {
    icon: [{ url: "/brand-mark.png", type: "image/png" }],
    apple: [{ url: "/brand-mark.png", type: "image/png" }],
  },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-SXX19XB9FJ"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-SXX19XB9FJ');`}
        </Script>
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebSite",
                name: siteName,
                url: siteUrl,
              },
              {
                "@type": "Organization",
                name: siteName,
                url: siteUrl,
                logo: siteUrl + "/brand-mark.png",
              },
            ],
          }}
        />
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <header className="site-header wrap">
          <Link className="brand" href="/" aria-label="Myth Coloring home">
            <img className="brand-mark" src="/brand-mark.png" alt="" />
            Myth Coloring
          </Link>
          <nav aria-label="Primary navigation">
            <Link href="/coloring-pages/">Coloring Pages</Link>
            <Link href="/themes/">Themes</Link>
            <Link href="/creatures/">Creatures</Link>
          </nav>
        </header>
        <main id="main">{children}</main>
        <footer className="footer wrap">
          <Link className="brand" href="/">
            Myth Coloring
          </Link>
          <p>Myths to discover. Creatures to color.</p>
          <nav className="footer-links" aria-label="Footer navigation">
            <div>
              <span>About</span>
              <Link href="/about/">About MythColoring</Link>
              <Link href="/contact/">Contact</Link>
              <Link href="/licensing/">Licensing</Link>
            </div>
            <div>
              <span>Legal</span>
              <Link href="/privacy-policy/">Privacy Policy</Link>
              <Link href="/terms/">Terms of Use</Link>
            </div>
          </nav>
          <span>© 2026 Myth Coloring</span>
        </footer>
      </body>
    </html>
  );
}
