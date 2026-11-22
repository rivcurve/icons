import Link from "next/link";
import { Catalog } from "@/components/catalog";
import { Icon } from "@/components/icon";
import { PackageExample } from "@/components/package-example";
import { ProductPreview } from "@/components/product-preview";
import { catalogAnchor } from "@/lib/catalog-links";
import { issues, repository } from "@/lib/project-links";
import "./catalog.css";
import "./homepage.css";

const principles = [
  { icon: "layout-grid", title: "Clear at small sizes", text: "Compare each icon at 16, 20 and 24 px in the catalog." },
  { icon: "git-branch", title: "One drawing per icon", text: "The same SVG source drives the catalog and future framework packages." },
  { icon: "file-text", title: "Built to be shared", text: "Inspect the source and see the rules behind Refined on GitHub." },
];

export default function Home() {
  return (
    <>
      <section className="wrap home-intro">
        <div>
          <h1>Icons for real interfaces.</h1>
          <p>Refined is an open-source collection of rounded outline icons in development.</p>
        </div>
        <Link className="button button-primary" href="/docs/">Get started <Icon name="arrow-right" size={17} /></Link>
      </section>

      <section id="catalog" className="wrap home-catalog" aria-labelledby="catalog-title">
        <header className="section-heading">
          <div><h2 id="catalog-title">Refined icons</h2><p>24 × 24 grid · 2-unit stroke</p></div>
        </header>
        <Catalog />
      </section>

      <section className="hero-shell" aria-labelledby="example-title">
        <div className="wrap hero demo-section">
          <div className="hero-copy">
            <h2 id="example-title">See Refined in use.</h2>
            <p>Compare the same icons in a file manager, a finance dashboard and developer tools.</p>
            <Link className="text-link demo-jump" href={catalogAnchor}>Back to icons <Icon name="chevron-down" className="arrow-up" size={16} /></Link>
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
