import Link from "next/link";
import { Icon } from "@/components/icon";
import { PackageExample } from "@/components/package-example";
import { icons } from "@/lib/catalog";

const specimen = ["home", "search", "upload", "download", "folder", "folder-open", "file-text",
  "image", "database", "layout-grid", "banknote", "bell", "git-branch", "chart-pie"];

function FilesDemo() {
  const sections = [
    ["folder", "All files"], ["image", "Images"], ["database", "Data"], ["archive", "Archive"],
  ];
  const files = [
    ["folder-open", "Design", "Folder"], ["folder", "Product", "Folder"],
    ["image", "cover.png", "Image"], ["database", "data.db", "Database"],
  ];

  return (
    <figure className="demo-stage" aria-label="Refined icons in a sample files interface">
      <svg className="stage-lines" viewBox="0 0 360 180" aria-hidden="true" fill="none">
        <path d="M-12 162h72c52 0 73-20 86-68 14-47 43-65 95-65h133M102 175h56c53 0 74-20 87-68 13-47 42-65 94-65h38" stroke="currentColor" strokeWidth="2.5" />
      </svg>
      <div className="files-demo" aria-hidden="true">
        <div className="demo-header">
          <strong><Icon name="folder" size={21} /> Files</strong>
          <span><Icon name="upload" size={16} /> Upload</span>
        </div>
        <div className="demo-body">
          <ul className="demo-sidebar">
            {sections.map(([icon, label]) => <li key={label}><Icon name={icon} size={16} />{label}</li>)}
          </ul>
          <table>
            <thead><tr><th scope="col">Name</th><th scope="col">Kind</th></tr></thead>
            <tbody>
              {files.map(([icon, label, kind]) => (
                <tr key={label}><td><span><Icon name={icon} size={17} />{label}</span></td><td>{kind}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </figure>
  );
}

export default function Home() {
  return (
    <>
      <section className="hero-shell">
        <div className="wrap hero">
          <div className="hero-copy">
            <h1>Icons for real<br className="hero-break" /> interfaces.</h1>
            <p>{icons.length} rounded outline icons, designed to read clearly at small sizes.</p>
            <div className="hero-actions">
              <Link className="button button-primary" href="/docs/">Get started</Link>
              <Link className="button button-secondary" href="/icons/">Browse icons</Link>
            </div>
          </div>
          <FilesDemo />
        </div>
      </section>
      <section className="wrap">
        <div className="intro-section">
          <div>
            <h2>Use Rivcurve</h2>
            <p>Explore the planned React and Vue components, or grab an SVG for your project.</p>
          </div>
          <PackageExample />
        </div>
        <div className="specimen-section">
          <div className="specimen-heading">
            <h2>Refined</h2>
            <p>{icons.length} outline icons <span>·</span> 24 × 24 grid <span>·</span> 2-unit stroke</p>
          </div>
          <ul className="specimen">
            {specimen.map((name) => (
              <li key={name}>
                <Link href={`/icons/${name}/`} aria-label={name} title={name}><Icon name={name} /></Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
