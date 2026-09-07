import { ThemeCards } from "../../components/theme-cards";
import { pageMetadata } from "../../lib/seo";
export const metadata = pageMetadata(
  "Mythological Coloring Themes",
  "Explore our mythical creature coloring collections, starting with the Shan Hai Jing.",
  "/themes/",
);
export default function Page() {
  return (
    <div className="wrap page-content">
      <header className="page-heading">
        <p className="eyebrow">One collection at a time</p>
        <h1>Explore Themes</h1>
        <p>Discover coloring pages through the myths that inspired them.</p>
      </header>
      <ThemeCards />
    </div>
  );
}
