"use client";

import { useRef, useState } from "react";
import { iconSvg, type IconRecord } from "@/lib/catalog";

export function SvgActions({ icon }: { icon: IconRecord }) {
  const [size, setSize] = useState(24);
  const [status, setStatus] = useState("");
  const source = useRef<HTMLTextAreaElement>(null);
  const svg = iconSvg(icon, size);

  async function copy() {
    try {
      await navigator.clipboard.writeText(svg);
      setStatus("SVG copied.");
    } catch {
      source.current?.focus();
      source.current?.select();
      setStatus("SVG selected. Copy it with your keyboard.");
    }
  }

  return (
    <section className="svg-actions" aria-label="Export SVG">
      <label className="catalog-select">
        <span>Export size</span>
        <select value={size} onChange={(event) => { setSize(Number(event.target.value)); setStatus(""); }}>
          {[16, 20, 24].map((value) => <option key={value} value={value}>{value} px</option>)}
        </select>
      </label>
      <textarea aria-label="SVG source" readOnly ref={source} value={svg} rows={7} spellCheck={false} />
      <div className="export-buttons">
        <button className="button button-primary" type="button" onClick={copy}>Copy SVG</button>
        <a className="button button-secondary" href={`data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`} download={`${icon.name}.svg`}>Download SVG</a>
      </div>
      <p className="export-status" role="status">{status}</p>
    </section>
  );
}
