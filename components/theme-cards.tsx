import Link from "next/link";
import { publishedThemes } from "../data/themes";
export function ThemeCards() {
  return (
    <div className="theme-grid">
      {publishedThemes.map((t) => (
        <Link
          className="theme-card"
          href={"/themes/" + t.slug + "/"}
          key={t.slug}
        >
          {t.heroImage && (
            <img
              src={t.heroImage}
              alt={t.name + " collection artwork"}
              width={600}
              height={300}
            />
          )}
          <p className="eyebrow">Coloring collection</p>
          <h3>{t.name}</h3>
          <p>{t.shortDescription}</p>
          <span className="text-link">Browse the collection →</span>
        </Link>
      ))}
    </div>
  );
}
