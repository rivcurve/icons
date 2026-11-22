import type { Metadata } from "next";
import { icons } from "@/lib/catalog";
import { Catalog } from "./catalog";
import "../catalog.css";

export const metadata: Metadata = { title: "Icons" };

export default function IconsPage() {
  return (
    <div className="wrap subpage">
      <header><h1>Refined icons</h1><p>{icons.length} rounded outline icons for product interfaces.</p></header>
      <Catalog />
    </div>
  );
}
