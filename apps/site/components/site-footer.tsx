import Link from "next/link";
import { BrandMark } from "@/components/brand";
import { issues, releases, repository } from "@/lib/project-links";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-grid">
        <div className="footer-intro">
          <Link href="/" className="wordmark"><BrandMark /> Rivcurve</Link>
          <p>Refined outline icons for product interfaces.</p>
        </div>
        <nav aria-label="Library">
          <h2>Library</h2>
          <Link href="/icons/">Icon catalog</Link>
          <Link href="/docs/">Get started</Link>
        </nav>
        <nav aria-label="Project">
          <h2>Project</h2>
          <a href={repository}>Source on GitHub</a>
          <a href={issues}>Issues</a>
          <a href={releases}>Releases</a>
          <Link href="/docs/#contributing">Contributing</Link>
        </nav>
      </div>
    </footer>
  );
}
