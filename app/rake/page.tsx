import type { Metadata } from "next";
import { RakeAdmin } from "../../components/rake-admin";

export const metadata: Metadata = { title: "MythColoring Admin", alternates: { canonical: "/rake/" }, robots: { index: false, follow: false } };

export default function RakePage() {
  return <RakeAdmin />;
}
