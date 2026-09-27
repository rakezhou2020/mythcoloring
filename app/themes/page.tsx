import Link from "next/link";
import { ThemeCards } from "../../components/theme-cards";
import { contentThemes } from "../../data/standard-coloring-pages";
import { pageMetadata } from "../../lib/seo";
export const metadata = pageMetadata(
  "Coloring Page Themes",
  "Explore MythColoring through bigger creative worlds, from nature and architecture to Chinese mythology and seasonal collections.",
  "/themes/",
);
export default function Page() {
  return (
    <div className="wrap page-content">
      <header className="page-heading">
        <p className="eyebrow">Creative worlds to explore</p>
        <h1>Explore Themes</h1>
        <p>Themes bring related categories and collections together. They are broader than the Coloring Pages directory.</p>
      </header>
      <section className="theme-worlds" aria-label="Theme collections">
        {contentThemes.map((theme) => theme.slug === "chinese-mythology" || theme.slug === "nature" ? (
          <Link className="theme-world-card" href={theme.slug === "nature" ? "/themes/nature/" : "/themes/shan-hai-jing/"} key={theme.slug}>
            <p className="eyebrow">Theme</p><h2>{theme.name}</h2><p>{theme.description}</p><span className="text-link">Explore {theme.name} →</span>
          </Link>
        ) : (
          <article className="theme-world-card" key={theme.slug}>
            <p className="eyebrow">Theme · Coming soon</p><h2>{theme.name}</h2><p>{theme.description}</p>
          </article>
        ))}
      </section>
      <section className="theme-existing section">
        <div className="section-heading"><div><p className="eyebrow">Mythology collection</p><h2>Current Collections</h2></div></div>
      <ThemeCards />
      </section>
    </div>
  );
}
