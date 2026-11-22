"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/icon";
import styles from "./docs.module.css";

const groups = [
  { label: "Start here", links: [{ id: "overview", label: "Overview" }, { id: "svg", label: "Use SVGs" }, { id: "styling", label: "Size and color" }] },
  { label: "Frameworks", links: [{ id: "react", label: "React" }, { id: "vue", label: "Vue" }] },
  { label: "Project", links: [{ id: "accessibility", label: "Accessibility" }, { id: "contributing", label: "Contributing" }, { id: "releases", label: "Release status" }] },
] as const;
const links = groups.flatMap<{ id: string; label: string }>(({ links }) => [...links]);

export function DocsNavigation() {
  const [active, setActive] = useState("overview");
  const details = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const headings = links.map(({ id }) => document.getElementById(id)).filter((node) => node !== null);
    let frame = 0;
    function update() {
      frame = 0;
      const rootSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
      const sticky = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || rootSize * 6;
      const current = headings.findLast((node) => node.getBoundingClientRect().top <= sticky + 20);
      setActive(current?.id ?? "overview");
    }
    function schedule() {
      if (!frame) frame = window.requestAnimationFrame(update);
    }
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("hashchange", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("hashchange", schedule);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  function fillNav() {
    return groups.map(({ label, links }) => (
      <div key={label} className={styles.navGroup}>
        <p>{label}</p>
        <ul>{links.map(({ id, label }) => (
          <li key={id}><a href={`#${id}`} aria-current={active === id ? "location" : undefined} onClick={() => {
            setActive(id);
            if (details.current?.open) details.current.open = false;
          }}>{label}</a></li>
        ))}</ul>
      </div>
    ));
  }

  return (
    <aside className={styles.sidebar}>
      <nav aria-label="Documentation sections" className={`${styles.nav} ${styles.desktopNav}`}>{fillNav()}</nav>
      <details ref={details} className={styles.mobileNav}>
        <summary><Icon name="file-text" size={17} /><span>In this guide</span><Icon name="chevron-down" size={17} /></summary>
        <nav aria-label="Documentation sections" className={styles.nav}>{fillNav()}</nav>
      </details>
    </aside>
  );
}
