import type { Metadata } from "next";
import Link from "next/link";
import "../catalog.css";

export const metadata: Metadata = { title: "Get started" };

const examples = [
  { id: "react", label: "React", snippet: "import { FolderOpenIcon } from '@rivcurve/react';\n\nexport function Example() {\n  return <FolderOpenIcon size={20} />;\n}" },
  { id: "vue", label: "Vue", snippet: "<script setup>\nimport { FolderOpenIcon } from '@rivcurve/vue';\n</script>\n\n<template>\n  <FolderOpenIcon :size=\"20\" />\n</template>" },
];

export default function DocsPage() {
  return (
    <article className="wrap subpage guide">
      <header>
        <h1>Get started</h1>
        <p>Use Refined icons in an interface. Choose a package example or take an SVG from the catalog.</p>
      </header>
      <nav className="guide-nav" aria-label="On this page">
        <a href="#react">React</a><a href="#vue">Vue</a><a href="#svg">SVG</a>
      </nav>
      <p className="status-note">React and Vue packages are in development. The examples show the planned API.</p>
      {examples.map(({ id, label, snippet }) => (
        <section key={id} id={id}>
          <h2>{label}</h2>
          <p>Import the icon by name and set its size in pixels. Stroke color follows the surrounding text.</p>
          <pre><code>{snippet}</code></pre>
        </section>
      ))}
      <section id="svg">
        <h2>SVG</h2>
        <p>Open an icon in the <Link href="/icons/">catalog</Link> and choose Copy SVG or Download SVG.</p>
        <p>Hide a decorative icon from assistive technology. Give the control a name when the icon is the only thing inside a button.</p>
      </section>
    </article>
  );
}
