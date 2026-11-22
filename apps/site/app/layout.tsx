import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import "@fontsource-variable/manrope";
import { BrandMark } from "@/components/brand";
import { themeBootScript } from "@/components/theme-settings";
import { ThemeSwitcher } from "@/components/theme-switcher";
import "./globals.css";
import "@/components/arc/rivcurve.css";

export const metadata: Metadata = {
  title: { default: "Rivcurve — Icons for real interfaces", template: "%s · Rivcurve" },
  description: "Refined is a collection of 50 rounded outline icons for product interfaces.",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: themeBootScript }} /></head>
      <body>
        <a className="skip-link" href="#content">Skip to content</a>
        <header className="site-header">
          <div className="wrap site-header-inner">
            <Link href="/" className="wordmark"><BrandMark /> Rivcurve</Link>
            <nav aria-label="Main navigation">
              <Link href="/icons/">Icons</Link>
              <Link href="/docs/">Docs</Link>
              <ThemeSwitcher />
            </nav>
          </div>
        </header>
        <main id="content">{children}</main>
        <footer className="site-footer">
          <div className="wrap site-footer-inner">
            <Link href="/" className="footer-brand">Rivcurve</Link>
            <span>Refined outline icons</span>
            <nav aria-label="Footer navigation"><Link href="/icons/">Icons</Link><Link href="/docs/">Docs</Link></nav>
          </div>
        </footer>
      </body>
    </html>
  );
}
