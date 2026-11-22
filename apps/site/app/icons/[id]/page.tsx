import type { Metadata } from "next";
import Link from "next/link";
import { catalogAnchor } from "@/lib/catalog-links";
import { notFound } from "next/navigation";
import { Icon } from "@/components/icon";
import { categories, findIcon, icons } from "@/lib/catalog";
import { SvgActions } from "./svg-actions";
import "../../catalog.css";

type Properties = { params: Promise<{ id: string }> };
export const dynamicParams = false;

export function generateStaticParams() {
  return icons.map(({ name }) => ({ id: name }));
}

export async function generateMetadata({ params }: Properties): Promise<Metadata> {
  return { title: (await params).id };
}

export default async function IconDetails({ params }: Properties) {
  const { id } = await params;
  const icon = findIcon(id);
  if (!icon) notFound();

  const category = categories.find(({ id }) => id === icon.category);

  return (
    <article className="wrap subpage details">
      <Link href={catalogAnchor} className="text-link">← All icons</Link>
      <header><h1>{icon.name}</h1><p>Refined · {category?.label ?? icon.category}</p></header>
      <div className="detail-grid">
        <div className="detail-specimen">
          <Icon name={icon.name} size={112} />
          <ul>{[16, 20, 24].map((size) => <li key={size}><Icon name={icon.name} size={size} /><span>{size} px</span></li>)}</ul>
        </div>
        <SvgActions icon={icon} />
      </div>
    </article>
  );
}
