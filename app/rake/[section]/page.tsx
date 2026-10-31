import type { Metadata } from "next";
import { RakeAdmin } from "../../../components/rake-admin";

const sections = ["coloring-pages", "themes", "product-links"];

export function generateStaticParams() {
  return sections.map((section) => ({ section }));
}

export const metadata: Metadata = { title: "MythColoring 后台管理", robots: { index: false, follow: false } };

export default function RakeSectionPage() {
  return <RakeAdmin />;
}

