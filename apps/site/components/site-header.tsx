"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandMark } from "@/components/brand";
import { Icon } from "@/components/icon";
import { QuickFind } from "@/components/quick-find";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { repository } from "@/lib/project-links";
import { catalogAnchor } from "@/lib/catalog-links";

const pages = [
  { href: catalogAnchor, label: "Icons" },
  { href: "/docs/", label: "Docs" },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="site-header">
      <div className="wrap site-header-inner">
        <Link href="/" className="wordmark"><BrandMark /> Rivcurve</Link>
        <nav className="main-nav" aria-label="Main navigation">
          {pages.map(({ href, label }) => {
            const active = href === catalogAnchor ? pathname === "/" || pathname.startsWith("/icons/") : pathname.startsWith("/docs");
            return <Link key={href} href={href} aria-current={active ? "page" : undefined}>{label}</Link>;
          })}
        </nav>
        <div className="site-tools">
          <QuickFind />
          <a className="github-link" href={repository}>GitHub <Icon name="external-link" size={14} /></a>
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
}
