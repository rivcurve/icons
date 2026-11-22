import type { Metadata } from "next";
import type { ReactNode } from "react";
import "@fontsource-variable/manrope";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { themeBootScript } from "@/components/theme-settings";
import "./globals.css";
import "./site-chrome.css";
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
        <SiteHeader />
        <main id="content">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
