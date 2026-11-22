import type { Metadata } from "next";
import Link from "next/link";
import { catalogAnchor } from "@/lib/catalog-links";
import { Icon } from "@/components/icon";
import { findIcon, icons, iconSvg } from "@/lib/catalog";
import { issues, releases, repository } from "@/lib/project-links";
import { CodeExample } from "./code-example";
import { DocsNavigation } from "./navigation";
import styles from "./docs.module.css";

export const metadata: Metadata = {
  title: "Documentation",
  description: "Get started with Rivcurve, use Refined SVGs, preview the React and Vue APIs, and learn how to contribute.",
};


const frameworkExamples = [
  {
    id: "react",
    name: "React",
    packageName: "@rivcurve/react",
    filename: "FolderAction.tsx",
    snippet: `import { FolderOpenIcon } from '@rivcurve/react';

export function FolderAction() {
  return (
    <button type="button">
      <FolderOpenIcon size={20} aria-hidden="true" />
      Open folder
    </button>
  );
}`,
  },
  {
    id: "vue",
    name: "Vue",
    packageName: "@rivcurve/vue",
    filename: "FolderAction.vue",
    snippet: `<script setup>
import { FolderOpenIcon } from '@rivcurve/vue';
</script>

<template>
  <button type="button">
    <FolderOpenIcon :size="20" aria-hidden="true" />
    Open folder
  </button>
</template>`,
  },
] as const;

const localSvgExample = `<button type="button">
  <img src="./folder-open.svg" width="20" height="20" alt="" />
  Open folder
</button>`;

export default function DocsPage() {
  const folderIcon = findIcon("folder-open");
  const svgSource = folderIcon ? iconSvg(folderIcon, 20).trimEnd() : "";

  return (
    <div className={`wrap ${styles.layout}`}>
      <DocsNavigation />
      <article className={styles.content}>
        <header id="overview" className={styles.intro}>
          <h1>Get started</h1>
          <p>Use Rivcurve’s Refined icons in product interfaces. The first collection includes {icons.length} outline icons built on a 24 × 24 grid.</p>
          <div className={styles.actions}>
            <a className={`button button-primary ${styles.action}`} href="#svg">
              <Icon name="download" size={17} /> Start with SVG
            </a>
            <Link className={`button button-secondary ${styles.action}`} href={catalogAnchor}>
              Browse the catalog <Icon name="arrow-right" size={17} />
            </Link>
          </div>
        </header>

        <section aria-labelledby="svg">
          <h2 id="svg">Use SVGs</h2>
          <p>SVGs are available directly from the catalog. Open an icon, choose an export size, then download the file or copy its markup.</p>
          <ol id="download-steps" className={styles.steps}>
            <li>Open <Link href="/icons/folder-open/">Folder open</Link> and select <b>20 px</b>.</li>
            <li>Choose <b>Download SVG</b> and save <code>folder-open.svg</code> next to your HTML file.</li>
            <li>Add the markup below. Open the HTML file in your browser to see the result.</li>
          </ol>
          <div className={styles.preview} aria-label="Example button preview">
            <span><Icon name="folder-open" size={20} /> Open folder</span>
            <p>20 px icon · 24 × 24 viewBox</p>
          </div>
          <CodeExample label="index.html" source={localSvgExample} />
        </section>

        <section aria-labelledby="styling">
          <h2 id="styling">Size and color</h2>
          <p>The 24 × 24 viewBox is the drawing grid. Change width and height together to display an icon at 16, 20, or 24 px without distorting it.</p>
          <div className={styles.sizeSample} aria-label="Folder icon at 16, 20 and 24 pixels">
            {[16, 20, 24].map((size) => <div key={size}><Icon name="folder-open" size={size} /><code>{size} px</code></div>)}
          </div>
          <h3 id="current-color">Match the surrounding text color</h3>
          <p>Paste the SVG in your markup and set <code>color</code> on its container. Refined strokes use <code>currentColor</code>. An SVG loaded through <code>&lt;img&gt;</code> cannot inherit the page’s text color.</p>
          {svgSource && <CodeExample label="folder-open.svg" source={svgSource} />}
          <h3 id="stroke">Adjust stroke weight carefully</h3>
          <p>The original stroke width is 2 units. Keep it consistent across related icons, and check a change at 16 px before using it throughout a toolbar.</p>
        </section>

        {frameworkExamples.map(({ id, name, packageName, filename, snippet }) => (
          <section key={id} aria-labelledby={id}>
            <div className={styles.sectionHeading}>
              <h2 id={id}>{name}</h2>
              <span>Planned API</span>
            </div>
            <p>The <code>{packageName}</code> package is in development and has not been published. The example shows the intended component API. Use the <a href="#svg">SVG workflow</a> in your app today.</p>
            <CodeExample label={filename} source={snippet} />
          </section>
        ))}

        <section aria-labelledby="accessibility">
          <h2 id="accessibility">Accessibility</h2>
          <dl className={styles.definitions}>
            <div><dt>Decorative icons</dt><dd>When text already describes the action, use <code>alt=""</code> on an image or <code>aria-hidden="true"</code> on inline SVG.</dd></div>
            <div id="icon-buttons"><dt>Icon-only buttons</dt><dd>Put the accessible name on the button itself, for example <code>aria-label="Open folder"</code>. Keep the icon inside decorative.</dd></div>
            <div><dt>Meaningful standalone icons</dt><dd>Use descriptive <code>alt</code> text for an image. For inline SVG, add <code>role="img"</code> and an accessible name.</dd></div>
          </dl>
        </section>

        <section aria-labelledby="contributing">
          <h2 id="contributing">Contributing</h2>
          <p>For an icon request, describe the interface action or state it represents, link a similar Refined icon if one exists, and include a screenshot or sketch. When editing a shape, compare it alongside its neighbors at 16, 20, and 24 px.</p>
          <p>Read the <a href={`${repository}/blob/main/DESIGN_GUIDELINES.md`}>icon design guidelines</a> or <a href={issues}>view issues on GitHub</a>. These links require repository access during the private preview.</p>
        </section>

        <section aria-labelledby="releases">
          <h2 id="releases">Release status</h2>
          <dl className={styles.definitions}>
            <div><dt>Available now</dt><dd>The Refined SVG catalog with search, previews, and exports.</dd></div>
            <div><dt>In development</dt><dd>React and Vue packages generated from the same SVG sources.</dd></div>
            <div><dt>Planned for later</dt><dd>Flutter support following the web release.</dd></div>
          </dl>
          <p>Follow progress in the <a href={repository}>Rivcurve repository</a> and check <a href={releases}>GitHub Releases</a> once the first packages ship.</p>
        </section>
      </article>
      <aside className={styles.outline}>
        <nav aria-label="Quick links within this guide">
          <p>On this page</p>
          <a href="#download-steps">Download an SVG</a>
          <a href="#current-color">Inherit text color</a>
          <a href="#stroke">Scale stroke weight</a>
          <a href="#icon-buttons">Name icon buttons</a>
        </nav>
        <a className={styles.sourceLink} href={`${repository}/tree/main/icons`}>
          <Icon name="external-link" size={15} /> SVG source
        </a>
      </aside>
    </div>
  );
}
