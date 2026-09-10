import type { MetadataRoute } from "next";
import { publishedThemes } from "../data/themes";
import { publishedCreatures } from "../data/creatures";
import { siteUrl } from "../lib/seo";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "/",
    "/coloring-pages/",
    "/themes/",
    "/creatures/",
    "/about/",
    "/privacy-policy/",
    "/terms/",
    "/contact/",
    ...publishedThemes.map((t) => "/themes/" + t.slug + "/"),
    ...publishedCreatures.map((c) => "/creatures/" + c.slug + "/"),
  ].map((path) => ({ url: siteUrl + path }));
}
