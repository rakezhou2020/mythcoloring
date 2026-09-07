import type { Metadata } from "next";
export const siteUrl = "https://mythcoloring.com";
export function pageMetadata(
  title: string,
  description: string,
  path: string,
): Metadata {
  return {
    title,
    description,
    alternates: { canonical: siteUrl + path },
    openGraph: {
      title,
      description,
      url: siteUrl + path,
      siteName: "Myth Coloring",
      type: "website",
    },
  };
}
