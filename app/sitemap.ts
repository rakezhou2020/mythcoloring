import type { MetadataRoute } from "next";
import { publishedThemes } from "../data/themes";
import { publishedCreatures } from "../data/creatures";
import { publishedStandardColoringCategories, publishedStandardColoringPages } from "../data/standard-coloring-pages";
import { siteUrl } from "../lib/seo";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date().toISOString().slice(0, 10);
  return [
    "/",
    "/coloring-pages/",
    "/themes/",
    "/creatures/",
    "/about/",
    "/licensing/",
    "/privacy-policy/",
    "/terms/",
    "/contact/",
    ...publishedThemes.map((t) => "/themes/" + t.slug + "/"),
    ...publishedCreatures.map((c) => "/creatures/" + c.slug + "/"),
    ...publishedStandardColoringCategories.map((category) => "/coloring-pages/" + category.slug + "/"),
    ...publishedStandardColoringPages.map((page) => "/coloring-pages/" + page.categorySlug + "/" + page.slug + "/"),
  ].map((path) => ({ url: siteUrl + path, lastModified }));
}
