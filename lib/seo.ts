import type { Metadata } from "next";
export const siteUrl = "https://mythcoloring.com";
export const siteName = "MythColoring";
export function pageMetadata(
  title: string,
  description: string,
  path: string,
): Metadata {
  return {
    title: { absolute: title + " | " + siteName },
    description,
    alternates: { canonical: siteUrl + path },
    openGraph: {
      title,
      description,
      url: siteUrl + path,
      siteName,
      type: "website",
    },
  };
}
