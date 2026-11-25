import type { MetadataRoute } from "next";
import { publishedThemes } from "../data/themes";
import { publishedCreatures } from "../data/creatures";
import { contentThemes, publishedStandardColoringCategories, publishedStandardColoringPages } from "../data/standard-coloring-pages";
import { siteUrl } from "../lib/seo";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date().toISOString().slice(0, 10);
  const staticPaths = ["/", "/coloring-pages/", "/themes/", "/creatures/", "/about/", "/licensing/", "/privacy-policy/", "/terms/", "/contact/", ...publishedThemes.map((t) => "/themes/" + t.slug + "/"), ...contentThemes.filter((t) => t.status === "published" && t.slug !== "chinese-mythology").map((t) => "/themes/" + t.slug + "/"), ...publishedStandardColoringCategories.map((category) => "/coloring-pages/" + category.slug + "/")];
  return [
    ...staticPaths.map((path) => ({ url: siteUrl + path, lastModified })),
    ...publishedCreatures.map((creature) => ({ url: `${siteUrl}/creatures/${creature.slug}/`, lastModified, images: creature.heroImage ? [siteUrl + creature.heroImage] : [] })),
    ...publishedStandardColoringPages.map((page) => ({ url: `${siteUrl}/coloring-pages/${page.categorySlug}/${page.slug}/`, lastModified, images: [page.lineArtImage, page.colorImage].map((image) => image.startsWith("http") ? image : siteUrl + image) })),
  ];
}
