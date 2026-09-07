import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://mythcoloring.com"),
  title: {
    default: "Myth Coloring — Free Mythical Creature Coloring Pages",
    template: "%s | Myth Coloring",
  },
  description:
    "Discover legendary creatures from China, Japan, and myths around the world with free printable coloring pages, color-by-number art, and creature lore.",
  openGraph: {
    title: "Myth Coloring",
    description:
      "Free mythical creature coloring pages, color-by-number art, and the stories behind every creature.",
    url: "https://mythcoloring.com",
    siteName: "Myth Coloring",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
