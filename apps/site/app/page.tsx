import Link from "next/link";
import { Icon } from "@/components/icon";
import { PackageExample } from "@/components/package-example";
import { ProductPreview } from "@/components/product-preview";
import { categories, icons } from "@/lib/catalog";
import { issues, repository } from "@/lib/project-links";
import "./homepage.css";

const samples: Record<string, string[]> = {
  navigation: ["compass", "map-pin", "layout-grid"],
  people: ["users", "user-check", "contact-card"],
  finance: ["wallet", "banknote", "chart-pie"],
  "files-data": ["folder-open", "download", "database"],
  development: ["terminal", "git-branch", "package"],
};

const principles = [
  { icon: "layout-grid", title: "Clear at small sizes", text: "Compare each icon at 16, 20 and 24 px in the catalog." },
  { icon: "git-branch", title: "One drawing per icon", text: "The same SVG source drives the catalog and future framework packages." },
  { icon: "file-text", title: "Built to be shared", text: "Inspect the source and see the rules behind Refined on GitHub." },
];

export default function Home() {
  return (
    <>
      <section className="hero-shell">
        <div className="wrap hero">
          <div className="hero-copy">
            <h1>Icons for real<br className="hero-break" /> interfaces.</h1>
            <p>Rivcurve is an open-source icon library in development. Explore {icons.length} rounded outline icons in the Refined collection.</p>
            <div className="hero-actions">
              <Link className="button button-primary" href="/docs/">Get started</Link>
              <Link className="button button-secondary" href="/icons/">Browse icons</Link>
            </div>
          </div>
          <ProductPreview />
        </div>
      </section>
      <section className="wrap intro-section" aria-labelledby="use-rivcurve">
        <div>
          <h2 id="use-rivcurve">Use Rivcurve</h2>
          <p>Grab an SVG today or explore the planned React and Vue components.</p>
        </div>
        <PackageExample />
      </section>
      <section className="wrap collection-section" aria-labelledby="collection-title">
        <header className="section-heading">
          <div><h2 id="collection-title">Meet Refined</h2><p>{icons.length} icons across {categories.length} categories.</p></div>
          <Link className="text-link" href="/icons/">Browse all icons <Icon name="arrow-right" size={16} /></Link>
        </header>
        <ul className="collection-list">
          {categories.map(({ id, label }) => (
            <li key={id}>
              <Link href={`/icons/?category=${id}`}>
                <div className="collection-glyphs">{samples[id]?.map((name) => <Icon key={name} name={name} />)}</div>
                <div className="collection-label">
                  <span>{label}</span><Icon name="arrow-right" size={15} />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <section className="wrap principles-section" aria-labelledby="principles-title">
        <h2 id="principles-title">Built for everyday UI</h2>
        <ul>
          {principles.map(({ icon, title, text }) => (
            <li key={title}><Icon name={icon} /><h3>{title}</h3><p>{text}</p></li>
          ))}
        </ul>
      </section>
      <section className="wrap project-section" aria-labelledby="project-title">
        <div><h2 id="project-title">Follow the project on GitHub</h2><p>Rivcurve is in development. GitHub will host the source, release notes and icon requests.</p></div>
        <div className="project-actions">
          <a className="button button-primary" href={repository}>View repository <Icon name="external-link" size={16} /></a>
          <a className="text-link" href={issues}>Project issues <Icon name="arrow-right" size={16} /></a>
        </div>
      </section>
    </>
  );
}
