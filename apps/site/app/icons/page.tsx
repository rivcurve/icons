import type { Metadata } from "next";
import Link from "next/link";
import { catalogAnchor } from "@/lib/catalog-links";
import { CatalogRedirect } from "./redirect";

export const metadata: Metadata = { title: "Icon catalog", robots: { index: false } };

export default function OldCatalogPage() {
  return (
    <section className="wrap subpage">
      <CatalogRedirect />
      <h1>Icon catalog</h1>
      <p>The catalog is now on the homepage. <Link href={catalogAnchor}>Open the catalog</Link>.</p>
    </section>
  );
}
